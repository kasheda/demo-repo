const requiredEnvVars = [
  'PORT',
  'APP_ENV',
  'APP_VERSION',
  'SERVICE_NAME',
  'FEATURE_FLAG'
];

const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);

if (missingEnvVars.length > 0) {
  console.error('Day 32 backend failed to start.');
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

const PORT = Number(process.env.PORT);
const APP_ENV = process.env.APP_ENV;
const APP_VERSION = process.env.APP_VERSION;
const SERVICE_NAME = process.env.SERVICE_NAME;
const FEATURE_FLAG = process.env.FEATURE_FLAG;

if (!Number.isInteger(PORT) || PORT <= 0) {
  console.error('Day 32 backend failed to start.');
  console.error(`Invalid PORT value: ${process.env.PORT}`);
  process.exit(1);
}

const express = require('express');

const app = express();

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: SERVICE_NAME,
    environment: APP_ENV,
    version: APP_VERSION
  });
});

app.get('/ready', (req, res) => {
  res.status(200).json({
    ready: true,
    service: SERVICE_NAME,
    environment: APP_ENV
  });
});

app.get('/api/message', (req, res) => {
  res.status(200).json({
    message: 'Hello from Day 32 backend API',
    service: SERVICE_NAME,
    environment: APP_ENV,
    version: APP_VERSION,
    featureFlag: FEATURE_FLAG
  });
});

app.get('/api/config', (req, res) => {
  res.status(200).json({
    service: SERVICE_NAME,
    environment: APP_ENV,
    version: APP_VERSION,
    featureFlag: FEATURE_FLAG,
    port: PORT
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`${SERVICE_NAME} listening on port ${PORT}`);
  console.log(`Environment: ${APP_ENV}`);
  console.log(`Version: ${APP_VERSION}`);
  console.log(`Feature flag: ${FEATURE_FLAG}`);
});
