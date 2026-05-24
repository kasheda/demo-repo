const requiredEnvVars = [
  'PORT',
  'APP_ENV',
  'APP_VERSION',
  'SERVICE_NAME',
  'FEATURE_FLAG',
  'LOG_LEVEL',
  'METRICS_ENABLED',
  'DEPLOY_TARGET'
];

const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);

if (missingEnvVars.length > 0) {
  console.error('Day 36 backend failed to start.');
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

const PORT = Number(process.env.PORT);
const APP_ENV = process.env.APP_ENV;
const APP_VERSION = process.env.APP_VERSION;
const SERVICE_NAME = process.env.SERVICE_NAME;
const FEATURE_FLAG = process.env.FEATURE_FLAG;
const LOG_LEVEL = process.env.LOG_LEVEL;
const METRICS_ENABLED = process.env.METRICS_ENABLED;
const DEPLOY_TARGET = process.env.DEPLOY_TARGET;

if (!Number.isInteger(PORT) || PORT <= 0) {
  console.error('Day 36 backend failed to start.');
  console.error(`Invalid PORT value: ${process.env.PORT}`);
  process.exit(1);
}

if (!['true', 'false'].includes(METRICS_ENABLED)) {
  console.error('Day 36 backend failed to start.');
  console.error(`Invalid METRICS_ENABLED value: ${METRICS_ENABLED}`);
  process.exit(1);
}

const express = require('express');

const app = express();

const startedAt = new Date();

const metrics = {
  totalRequests: 0,
  requestsByPath: {},
  statusCodes: {}
};

function createRequestId() {
  return `day36-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function logInfo(message, details = {}) {
  if (['info', 'debug'].includes(LOG_LEVEL)) {
    console.log(JSON.stringify({
      level: 'info',
      service: SERVICE_NAME,
      deployTarget: DEPLOY_TARGET,
      message,
      ...details
    }));
  }
}

function logError(message, details = {}) {
  console.error(JSON.stringify({
    level: 'error',
    service: SERVICE_NAME,
    deployTarget: DEPLOY_TARGET,
    message,
    ...details
  }));
}

function recordMetrics(path, statusCode) {
  if (METRICS_ENABLED !== 'true') {
    return;
  }

  metrics.totalRequests += 1;
  metrics.requestsByPath[path] = (metrics.requestsByPath[path] || 0) + 1;
  metrics.statusCodes[String(statusCode)] = (metrics.statusCodes[String(statusCode)] || 0) + 1;
}

app.use((req, res, next) => {
  const startedAtMs = Date.now();
  const requestId = req.headers['x-request-id'] || createRequestId();

  req.requestId = requestId;
  res.setHeader('X-Request-Id', requestId);

  res.on('finish', () => {
    const durationMs = Date.now() - startedAtMs;

    recordMetrics(req.path, res.statusCode);

    logInfo('request_completed', {
      requestId,
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs
    });
  });

  next();
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: SERVICE_NAME,
    environment: APP_ENV,
    deployTarget: DEPLOY_TARGET,
    version: APP_VERSION
  });
});

app.get('/ready', (req, res) => {
  res.status(200).json({
    ready: true,
    service: SERVICE_NAME,
    environment: APP_ENV,
    deployTarget: DEPLOY_TARGET
  });
});

app.get('/metrics', (req, res) => {
  if (METRICS_ENABLED !== 'true') {
    return res.status(404).json({
      error: 'Day 36 metrics disabled',
      service: SERVICE_NAME,
      deployTarget: DEPLOY_TARGET,
      requestId: req.requestId
    });
  }

  return res.status(200).json({
    service: SERVICE_NAME,
    environment: APP_ENV,
    deployTarget: DEPLOY_TARGET,
    version: APP_VERSION,
    metricsEnabled: true,
    startedAt: startedAt.toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    totalRequests: metrics.totalRequests,
    requestsByPath: metrics.requestsByPath,
    statusCodes: metrics.statusCodes,
    requestId: req.requestId
  });
});

app.get('/api/message', (req, res) => {
  res.status(200).json({
    message: 'Hello from Day 36 backend API',
    service: SERVICE_NAME,
    environment: APP_ENV,
    deployTarget: DEPLOY_TARGET,
    version: APP_VERSION,
    featureFlag: FEATURE_FLAG,
    requestId: req.requestId
  });
});

app.get('/api/config', (req, res) => {
  res.status(200).json({
    service: SERVICE_NAME,
    environment: APP_ENV,
    deployTarget: DEPLOY_TARGET,
    version: APP_VERSION,
    featureFlag: FEATURE_FLAG,
    logLevel: LOG_LEVEL,
    metricsEnabled: METRICS_ENABLED === 'true',
    port: PORT,
    requestId: req.requestId
  });
});

app.get('/api/error-test', (req, res) => {
  logError('controlled_error_test_triggered', {
    requestId: req.requestId,
    path: req.originalUrl
  });

  res.status(500).json({
    error: 'Day 36 controlled error test',
    service: SERVICE_NAME,
    deployTarget: DEPLOY_TARGET,
    requestId: req.requestId
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`${SERVICE_NAME} listening on port ${PORT}`);
  console.log(`Environment: ${APP_ENV}`);
  console.log(`Deploy target: ${DEPLOY_TARGET}`);
  console.log(`Version: ${APP_VERSION}`);
  console.log(`Feature flag: ${FEATURE_FLAG}`);
  console.log(`Log level: ${LOG_LEVEL}`);
  console.log(`Metrics enabled: ${METRICS_ENABLED}`);
});
