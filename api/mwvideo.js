export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { slug } = req.query;
  if (!slug) return res.status(400).json({ error: 'Missing slug' });

  const API_KEY  = '47eb73f2demsh76f968abf669fefp1adc10jsn53c4004121b4';
  const MW_HOST  = 'musclewiki-api.p.rapidapi.com';

  // Return the authenticated video URL for the client to use
  // We proxy the request to avoid CORS and expose the key
  const videoUrl = `https://${MW_HOST}/stream/videos/branded/${slug}`;

  try {
    const response = await fetch(videoUrl, {
      headers: {
        'x-rapidapi-key':  API_KEY,
        'x-rapidapi-host': MW_HOST,
      }
    });

    if (!response.ok) {
      return res.status(404).json({ videoUrl: null, error: 'Video not found' });
    }

    // Stream the video directly
    const contentType = response.headers.get('content-type') || 'video/mp4';
    const contentLength = response.headers.get('content-length');

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    if (contentLength) res.setHeader('Content-Length', contentLength);

    const buffer = await response.arrayBuffer();
    res.status(200).send(Buffer.from(buffer));

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const config = {
  api: { responseLimit: '50mb' }
};
