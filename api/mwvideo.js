const API_KEY = '47eb73f2demsh76f968abf669fefp1adc10jsn53c4004121b4';
const MW_HOST = 'musclewiki-api.p.rapidapi.com';
const HEADERS = {
  'x-rapidapi-key':  API_KEY,
  'x-rapidapi-host': MW_HOST,
  'Content-Type':    'application/json'
};

// Cache exercise lookups in memory (resets on cold start)
const exerciseCache = {};

// Step 1: search exercises by name → get video filenames
async function findExerciseVideos(name, gender) {
  const cacheKey = `${gender}:${name.toLowerCase()}`;
  if (exerciseCache[cacheKey]) return exerciseCache[cacheKey];

  const searchUrl = `https://${MW_HOST}/exercises?name=${encodeURIComponent(name)}&limit=5`;
  const r = await fetch(searchUrl, { headers: HEADERS });
  if (!r.ok) return null;

  const data = await r.json();
  const results = data.results || data || [];

  // Find best matching exercise
  const nameLower = name.toLowerCase();
  let best = null;
  for (const ex of results) {
    if (!best) { best = ex; continue; }
    const exName = (ex.name || '').toLowerCase();
    if (exName.includes(nameLower) || nameLower.includes(exName)) {
      best = ex;
      break;
    }
  }

  if (!best) return null;

  // Get videos for this exercise
  const exId = best.id;
  const vidUrl = `https://${MW_HOST}/exercises/${exId}/videos`;
  const vr = await fetch(vidUrl, { headers: HEADERS });
  if (!vr.ok) return null;

  const videos = await vr.json();
  exerciseCache[cacheKey] = { exercise: best, videos };
  return exerciseCache[cacheKey];
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { name, gender = 'male' } = req.query;

  // Legacy slug support
  const { slug } = req.query;

  if (!name && !slug) {
    return res.status(400).json({ error: 'Missing name or slug parameter' });
  }

  try {
    let videoStreamUrl = null;

    if (name) {
      // Smart search by exercise name
      const result = await findExerciseVideos(name, gender);

      if (result && result.videos) {
        const vids = result.videos;
        // Prefer side angle, same gender
        const preferred = vids.find(v =>
          v.includes(gender) && v.includes('side')
        ) || vids.find(v =>
          v.includes(gender)
        ) || vids.find(v =>
          v.includes('side')
        ) || vids[0];

        if (preferred) {
          videoStreamUrl = `https://${MW_HOST}/stream/videos/branded/${preferred}`;
        }
      }
    } else if (slug) {
      videoStreamUrl = `https://${MW_HOST}/stream/videos/branded/${slug}`;
    }

    if (!videoStreamUrl) {
      return res.status(404).json({ error: 'No video found', name, gender });
    }

    // Stream the video
    const vr = await fetch(videoStreamUrl, { headers: HEADERS });
    if (!vr.ok) {
      return res.status(vr.status).json({ error: 'Video stream failed', url: videoStreamUrl });
    }

    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Cache-Control', 'public, max-age=86400');

    const buf = await vr.arrayBuffer();
    return res.status(200).send(Buffer.from(buf));

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export const config = {
  api: { responseLimit: '50mb', bodyParser: false }
};
