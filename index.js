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
