const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;
const APP_ENV = process.env.APP_ENV || 'development';
const APP_VERSION = process.env.APP_VERSION || 'day-29-local';
const SERVICE_NAME = process.env.SERVICE_NAME || 'day29-backend';

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: SERVICE_NAME,
    environment: APP_ENV,
    version: APP_VERSION
  });
});

app.get('/api/message', (req, res) => {
  res.status(200).json({
    message: 'Hello from Day 29 backend API',
    service: SERVICE_NAME,
    environment: APP_ENV,
    version: APP_VERSION
  });
});

app.get('/api/config', (req, res) => {
  res.status(200).json({
    service: SERVICE_NAME,
    environment: APP_ENV,
    version: APP_VERSION,
    port: Number(PORT)
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`${SERVICE_NAME} listening on port ${PORT}`);
  console.log(`Environment: ${APP_ENV}`);
  console.log(`Version: ${APP_VERSION}`);
});
