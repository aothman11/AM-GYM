const API_KEY = '47eb73f2demsh76f968abf669fefp1adc10jsn53c4004121b4';
const MW_HOST = 'musclewiki-api.p.rapidapi.com';
const HEADERS = {
  'x-rapidapi-key':  API_KEY,
  'x-rapidapi-host': MW_HOST,
};

// In-memory cache (lives for duration of Vercel function instance)
let exerciseListCache = null;
const videoUrlCache = {};

async function getAllExercises() {
  if (exerciseListCache) return exerciseListCache;
  
  const all = [];
  let offset = 0;
  const limit = 100;
  
  while (true) {
    const url = `https://${MW_HOST}/exercises?limit=${limit}&offset=${offset}`;
    const r = await fetch(url, { headers: HEADERS });
    if (!r.ok) break;
    
    const data = await r.json();
    const results = data.results || (Array.isArray(data) ? data : []);
    if (!results.length) break;
    
    all.push(...results);
    if (results.length < limit) break;
    offset += limit;
    if (offset > 2000) break; // safety cap
  }
  
  exerciseListCache = all;
  return all;
}

function findBestMatch(exercises, name, gender) {
  const n = name.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').trim();
  const words = n.split(' ').filter(w => w.length > 2);
  
  let best = null;
  let bestScore = 0;
  
  for (const ex of exercises) {
    const exName = (ex.name || '').toLowerCase();
    
    // Exact match
    if (exName === n) return ex;
    
    // Score by word overlap
    let score = 0;
    for (const w of words) {
      if (exName.includes(w)) score++;
    }
    
    if (score > bestScore) {
      bestScore = score;
      best = ex;
    }
  }
  
  return bestScore > 0 ? best : null;
}

async function getVideoForExercise(exId, gender) {
  const cacheKey = `${exId}-${gender}`;
  if (videoUrlCache[cacheKey]) return videoUrlCache[cacheKey];
  
  const url = `https://${MW_HOST}/exercises/${exId}`;
  const r = await fetch(url, { headers: HEADERS });
  if (!r.ok) return null;
  
  const data = await r.json();
  const videos = data.videos || [];
  
  // Find best video: prefer gender + side
  const preferred = 
    videos.find(v => v.includes(gender) && v.includes('side')) ||
    videos.find(v => v.includes(gender) && v.includes('front')) ||
    videos.find(v => v.includes(gender)) ||
    videos.find(v => v.includes('side')) ||
    videos[0];
  
  videoUrlCache[cacheKey] = preferred || null;
  return preferred;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { action, name, gender = 'male', id } = req.query;

  try {
    // ACTION: list — return all exercises
    if (action === 'list') {
      const exercises = await getAllExercises();
      return res.status(200).json({
        total: exercises.length,
        exercises: exercises.map(ex => ({
          id:       ex.id,
          name:     ex.name,
          category: ex.category,
          muscles:  ex.muscles || [],
          videos:   ex.videos  || [],
        }))
      });
    }

    // ACTION: video by exercise ID
    if (action === 'video' && id) {
      const filename = await getVideoForExercise(id, gender);
      if (!filename) return res.status(404).json({ error: 'No video for this exercise' });
      
      const videoUrl = `https://${MW_HOST}/stream/videos/branded/${filename}`;
      const vr = await fetch(videoUrl, { headers: HEADERS });
      if (!vr.ok) return res.status(404).json({ error: 'Stream failed' });
      
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      const buf = await vr.arrayBuffer();
      return res.status(200).send(Buffer.from(buf));
    }

    // ACTION: search by name (default)
    if (name) {
      const exercises = await getAllExercises();
      const match = findBestMatch(exercises, name, gender);
      
      if (!match) return res.status(404).json({ error: 'Exercise not found', name });
      
      const filename = await getVideoForExercise(match.id, gender);
      if (!filename) return res.status(404).json({ error: 'No video found', exercise: match.name });
      
      const videoUrl = `https://${MW_HOST}/stream/videos/branded/${filename}`;
      const vr = await fetch(videoUrl, { headers: HEADERS });
      if (!vr.ok) return res.status(404).json({ error: 'Stream failed', filename });
      
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      const buf = await vr.arrayBuffer();
      return res.status(200).send(Buffer.from(buf));
    }

    return res.status(400).json({ error: 'Provide name, id, or action=list' });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export const config = {
  api: { responseLimit: '50mb', bodyParser: false }
};
