export default async function handler(req, res) {
  // Allow requests from the app
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: 'Missing name parameter' });
  }

  try {
    const url = `https://exercisedb.p.rapidapi.com/exercises/name/${encodeURIComponent(name)}?limit=1&offset=0`;

    const response = await fetch(url, {
      headers: {
        'x-rapidapi-key':  '47eb73f2demsh76f968abf669fefp1adc10jsn53c4004121b4',
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
    });

    const data = await response.json();

    if (data && data.length > 0) {
      return res.status(200).json({
        gifUrl: data[0].gifUrl || null,
        name:   data[0].name   || name
      });
    }

    return res.status(404).json({ gifUrl: null });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
