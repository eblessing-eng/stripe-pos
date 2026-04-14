const express = require('express');
const path = require('path');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', async (req, res) => {
  const resp = await fetch('https://api.stripe.com/v1/terminal/connection_tokens', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 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',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  const data = await resp.json();
  res.json(data);
});

app.listen(process.env.PORT || 3000);
