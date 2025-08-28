module.exports = (req, res) => {
  res.status(200).json({ ok: true, env: Boolean(process.env.GROQ_API_KEY) });
};

