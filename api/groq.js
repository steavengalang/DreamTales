module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }
  try {
    const overrideKey = req.headers['x-api-key'];
    const key = overrideKey || process.env.GROQ_API_KEY;
    if (!key) {
      res.status(500).json({ error: 'missing_api_key' });
      return;
    }
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    const text = await r.text();
    res.status(r.status).send(text);
  } catch (e) {
    res.status(500).json({ error: 'proxy_error', message: e.message });
  }
}

