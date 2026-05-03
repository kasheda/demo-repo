const express = require('express');

const app = express();
const PORT = 3000;

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'backend'
  });
});

app.get('/api/message', (req, res) => {
  res.json({
    message: 'Hello from backend API'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend app listening on port ${PORT}`);
});
