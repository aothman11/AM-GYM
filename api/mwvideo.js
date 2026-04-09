const API_KEY  = '47eb73f2demsh76f968abf669fefp1adc10jsn53c4004121b4';
const EX_HOST  = 'exercisedb.p.rapidapi.com';
const HEADERS  = {
  'x-rapidapi-key':  API_KEY,
  'x-rapidapi-host': EX_HOST,
};

const cache = {};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { name, gender = 'male' } = req.query;
  if (!name) return res.status(400).json({ error: 'Missing name' });

  const key = `${name}-${gender}`.toLowerCase();
  if (cache[key]) return res.status(200).json({ gifUrl: cache[key] });

  try {
    // Search by exercise name
    const url = `https://${EX_HOST}/exercises/name/${encodeURIComponent(name.toLowerCase())}?limit=1&offset=0`;
    const r = await fetch(url, { headers: HEADERS });

    if (!r.ok) {
      const txt = await r.text();
      return res.status(r.status).json({ error: txt });
    }

    const data = await r.json();

    if (!data || !data.length || !data[0].gifUrl) {
      return res.status(404).json({ error: 'No gif found', name });
    }

    const gifUrl = data[0].gifUrl;
    cache[key] = gifUrl;
    return res.status(200).json({ gifUrl });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
