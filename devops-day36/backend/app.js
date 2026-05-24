const express = require('express');

const app = express();

// Load environment variables
const PORT = process.env.PORT || 3000;
const APP_ENV = process.env.APP_ENV || 'development';
const APP_VERSION = process.env.APP_VERSION || 'v1';
const FEATURE_FLAG = process.env.FEATURE_FLAG || 'disabled';

// Fail fast if required env vars are missing
const requiredEnv = { PORT, APP_ENV, APP_VERSION, FEATURE_FLAG };
const missing = Object.entries(requiredEnv)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missing.length > 0) {
  console.error(`Day36 backend failed to start.\nMissing required environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

// Health route
app.get('/health', (req, res) => res.send('OK'));

// Example API
app.get('/api/message', (req, res) => {
  res.json({
    message: `Hello from day36-backend! Env: ${APP_ENV}, Version: ${APP_VERSION}, Feature: ${FEATURE_FLAG}`
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`day36-backend listening on port ${PORT}`);
  console.log(`Environment: ${APP_ENV}`);
  console.log(`Version: ${APP_VERSION}`);
  console.log(`Feature flag: ${FEATURE_FLAG}`);
});
