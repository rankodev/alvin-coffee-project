// Simple Node.js CORS proxy for Google Apps Script
// 1. Install dependencies: npm install express node-fetch
// 2. Run: node cors-proxy.js
// 3. In your React app, use http://localhost:8080/proxy?url=YOUR_SCRIPT_URL

const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 8080;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).json({ error: 'Missing url param' });
  try {
    const method = req.method;
    const headers = { ...req.headers };
    delete headers.host;
    let body = undefined;
    if (method === 'POST') {
      body = req;
    }
    const response = await fetch(targetUrl, {
      method,
      headers,
      body: method === 'POST' ? req.body : undefined,
    });
    const data = await response.text();
    res.status(response.status).send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`CORS Proxy running on http://localhost:${PORT}`);
});
