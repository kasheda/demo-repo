const requiredEnvVars = [
  'PORT',
  'APP_ENV',
  'APP_VERSION',
  'SERVICE_NAME',
  'FEATURE_FLAG',
  'LOG_LEVEL',
  'METRICS_ENABLED',
  'DEPLOY_TARGET',
  'BUILD_NUMBER',
  'GIT_COMMIT',
  'IMAGE_TAG',
  'RELEASE_CREATED_AT',
  'ROLLBACK_IMAGE_TAG',
  'ROLLBACK_MODE',
  'STABILITY_CHECK_WINDOW_SECONDS',
  'STABILITY_CHECK_INTERVAL_SECONDS',
  'FORCE_STABILITY_FAILURE',
  'FORCE_PRODLIKE_STABILITY_FAILURE',
  'PRODLIKE_ROLLBACK_ON_FAILURE',
  'PROMOTION_TARGET',
  'PROMOTION_APPROVED',
  'CHANGE_RECORD_ID',
  'RELEASE_NOTES_REQUIRED',
  'RELEASE_NOTES_STATUS',
  'APPROVAL_REQUIRED',
  'APPROVAL_STATUS',
  'APPROVED_BY',
  'APPROVAL_REASON',
  'DEPLOYMENT_WINDOW_STATUS',
  'CHANGE_FREEZE_ACTIVE',
  'FREEZE_REASON'
];

const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);

if (missingEnvVars.length > 0) {
  console.error('Day 49 backend failed to start.');
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
const BUILD_NUMBER = process.env.BUILD_NUMBER;
const GIT_COMMIT = process.env.GIT_COMMIT;
const IMAGE_TAG = process.env.IMAGE_TAG;
const RELEASE_CREATED_AT = process.env.RELEASE_CREATED_AT;
const ROLLBACK_IMAGE_TAG = process.env.ROLLBACK_IMAGE_TAG;
const ROLLBACK_MODE = process.env.ROLLBACK_MODE;
const STABILITY_CHECK_WINDOW_SECONDS = Number(process.env.STABILITY_CHECK_WINDOW_SECONDS);
const STABILITY_CHECK_INTERVAL_SECONDS = Number(process.env.STABILITY_CHECK_INTERVAL_SECONDS);
const FORCE_STABILITY_FAILURE = process.env.FORCE_STABILITY_FAILURE;
const FORCE_PRODLIKE_STABILITY_FAILURE = process.env.FORCE_PRODLIKE_STABILITY_FAILURE;
const PRODLIKE_ROLLBACK_ON_FAILURE = process.env.PRODLIKE_ROLLBACK_ON_FAILURE;
const PROMOTION_TARGET = process.env.PROMOTION_TARGET;
const PROMOTION_APPROVED = process.env.PROMOTION_APPROVED;
const CHANGE_RECORD_ID = process.env.CHANGE_RECORD_ID;
const RELEASE_NOTES_REQUIRED = process.env.RELEASE_NOTES_REQUIRED;
const RELEASE_NOTES_STATUS = process.env.RELEASE_NOTES_STATUS;
const APPROVAL_REQUIRED = process.env.APPROVAL_REQUIRED;
const APPROVAL_STATUS = process.env.APPROVAL_STATUS;
const APPROVED_BY = process.env.APPROVED_BY;
const APPROVAL_REASON = process.env.APPROVAL_REASON;
const DEPLOYMENT_WINDOW_STATUS = process.env.DEPLOYMENT_WINDOW_STATUS;
const CHANGE_FREEZE_ACTIVE = process.env.CHANGE_FREEZE_ACTIVE;
const FREEZE_REASON = process.env.FREEZE_REASON;

function fail(message) {
  console.error('Day 49 backend failed to start.');
  console.error(message);
  process.exit(1);
}

if (!Number.isInteger(PORT) || PORT <= 0) fail(`Invalid PORT value: ${process.env.PORT}`);
if (!['true', 'false'].includes(METRICS_ENABLED)) fail(`Invalid METRICS_ENABLED value: ${METRICS_ENABLED}`);
if (!['normal', 'rollback'].includes(ROLLBACK_MODE)) fail(`Invalid ROLLBACK_MODE value: ${ROLLBACK_MODE}`);
if (!Number.isInteger(STABILITY_CHECK_WINDOW_SECONDS) || STABILITY_CHECK_WINDOW_SECONDS <= 0) fail(`Invalid STABILITY_CHECK_WINDOW_SECONDS value: ${process.env.STABILITY_CHECK_WINDOW_SECONDS}`);
if (!Number.isInteger(STABILITY_CHECK_INTERVAL_SECONDS) || STABILITY_CHECK_INTERVAL_SECONDS <= 0) fail(`Invalid STABILITY_CHECK_INTERVAL_SECONDS value: ${process.env.STABILITY_CHECK_INTERVAL_SECONDS}`);
if (!['true', 'false'].includes(FORCE_STABILITY_FAILURE)) fail(`Invalid FORCE_STABILITY_FAILURE value: ${FORCE_STABILITY_FAILURE}`);
if (!['true', 'false'].includes(FORCE_PRODLIKE_STABILITY_FAILURE)) fail(`Invalid FORCE_PRODLIKE_STABILITY_FAILURE value: ${FORCE_PRODLIKE_STABILITY_FAILURE}`);
if (!['true', 'false'].includes(PRODLIKE_ROLLBACK_ON_FAILURE)) fail(`Invalid PRODLIKE_ROLLBACK_ON_FAILURE value: ${PRODLIKE_ROLLBACK_ON_FAILURE}`);
if (!['none', 'prodlike'].includes(PROMOTION_TARGET)) fail(`Invalid PROMOTION_TARGET value: ${PROMOTION_TARGET}`);
if (!['true', 'false'].includes(PROMOTION_APPROVED)) fail(`Invalid PROMOTION_APPROVED value: ${PROMOTION_APPROVED}`);
if (!CHANGE_RECORD_ID.startsWith('DAY49-CHANGE-')) fail(`Invalid CHANGE_RECORD_ID value: ${CHANGE_RECORD_ID}`);
if (!['true', 'false'].includes(RELEASE_NOTES_REQUIRED)) fail(`Invalid RELEASE_NOTES_REQUIRED value: ${RELEASE_NOTES_REQUIRED}`);
if (!['draft', 'generated', 'not-required'].includes(RELEASE_NOTES_STATUS)) fail(`Invalid RELEASE_NOTES_STATUS value: ${RELEASE_NOTES_STATUS}`);
if (!['true', 'false'].includes(APPROVAL_REQUIRED)) fail(`Invalid APPROVAL_REQUIRED value: ${APPROVAL_REQUIRED}`);
if (!['pending', 'approved', 'not-required'].includes(APPROVAL_STATUS)) fail(`Invalid APPROVAL_STATUS value: ${APPROVAL_STATUS}`);

if (APPROVAL_REQUIRED === 'true' && APPROVAL_STATUS === 'approved' && APPROVED_BY === 'none') {
  fail('APPROVED_BY must not be none when approval is required and approved.');
}

if (!['open', 'closed'].includes(DEPLOYMENT_WINDOW_STATUS)) {
  fail(`Invalid DEPLOYMENT_WINDOW_STATUS value: ${DEPLOYMENT_WINDOW_STATUS}`);
}

if (!['true', 'false'].includes(CHANGE_FREEZE_ACTIVE)) {
  fail(`Invalid CHANGE_FREEZE_ACTIVE value: ${CHANGE_FREEZE_ACTIVE}`);
}

if (CHANGE_FREEZE_ACTIVE === 'true' && FREEZE_REASON === 'none') {
  fail('FREEZE_REASON must not be none when CHANGE_FREEZE_ACTIVE=true.');
}

const fs = require('fs');
const express = require('express');

const app = express();
const startedAt = new Date();

const metrics = {
  totalRequests: 0,
  requestsByPath: {},
  statusCodes: {}
};

function createRequestId() {
  return `day49-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function releaseNotesReady() {
  return RELEASE_NOTES_REQUIRED === 'false' || RELEASE_NOTES_STATUS === 'generated';
}

function approvalReady() {
  return APPROVAL_REQUIRED === 'false' || APPROVAL_STATUS === 'approved';
}

function deploymentWindowReady() {
  return DEPLOYMENT_WINDOW_STATUS === 'open' && CHANGE_FREEZE_ACTIVE === 'false';
}

function prodlikeSafetyEnabled() {
  return DEPLOY_TARGET === 'prodlike' && PRODLIKE_ROLLBACK_ON_FAILURE === 'true';
}

function stabilityForcedToFail() {
  const stagingFailure = FORCE_STABILITY_FAILURE === 'true' && ROLLBACK_MODE === 'normal';
  const prodlikeFailure =
    DEPLOY_TARGET === 'prodlike' &&
    FORCE_PRODLIKE_STABILITY_FAILURE === 'true' &&
    ROLLBACK_MODE === 'normal';

  return stagingFailure || prodlikeFailure;
}

function buildMetadata() {
  return {
    buildNumber: BUILD_NUMBER,
    gitCommit: GIT_COMMIT,
    imageTag: IMAGE_TAG,
    releaseCreatedAt: RELEASE_CREATED_AT,
    rollbackImageTag: ROLLBACK_IMAGE_TAG,
    rollbackMode: ROLLBACK_MODE,
    stabilityCheckWindowSeconds: STABILITY_CHECK_WINDOW_SECONDS,
    stabilityCheckIntervalSeconds: STABILITY_CHECK_INTERVAL_SECONDS,
    forceStabilityFailure: FORCE_STABILITY_FAILURE === 'true',
    forceProdlikeStabilityFailure: FORCE_PRODLIKE_STABILITY_FAILURE === 'true',
    prodlikeRollbackOnFailure: PRODLIKE_ROLLBACK_ON_FAILURE === 'true',
    promotionTarget: PROMOTION_TARGET,
    promotionApproved: PROMOTION_APPROVED === 'true',
    changeRecordId: CHANGE_RECORD_ID,
    releaseNotesRequired: RELEASE_NOTES_REQUIRED === 'true',
    releaseNotesStatus: RELEASE_NOTES_STATUS,
    approvalRequired: APPROVAL_REQUIRED === 'true',
    approvalStatus: APPROVAL_STATUS,
    approvedBy: APPROVED_BY,
    approvalReason: APPROVAL_REASON,
    deploymentWindowStatus: DEPLOYMENT_WINDOW_STATUS,
    changeFreezeActive: CHANGE_FREEZE_ACTIVE === 'true',
    freezeReason: FREEZE_REASON
  };
}

function readReleaseManifest() {
  try {
    return JSON.parse(fs.readFileSync('/app/release.json', 'utf8'));
  } catch (error) {
    return {
      error: 'release manifest could not be read',
      details: error.message
    };
  }
}

function releaseManifestMatchesRuntime(manifest) {
  return (
    manifest.service === SERVICE_NAME &&
    manifest.deployTarget === DEPLOY_TARGET &&
    manifest.appVersion === APP_VERSION &&
    manifest.buildNumber === BUILD_NUMBER &&
    manifest.gitCommit === GIT_COMMIT &&
    manifest.imageTag === IMAGE_TAG &&
    manifest.releaseCreatedAt === RELEASE_CREATED_AT &&
    manifest.rollbackImageTag === ROLLBACK_IMAGE_TAG &&
    manifest.rollbackMode === ROLLBACK_MODE &&
    String(manifest.stabilityCheckWindowSeconds) === String(STABILITY_CHECK_WINDOW_SECONDS) &&
    String(manifest.stabilityCheckIntervalSeconds) === String(STABILITY_CHECK_INTERVAL_SECONDS) &&
    manifest.forceStabilityFailure === FORCE_STABILITY_FAILURE &&
    manifest.forceProdlikeStabilityFailure === FORCE_PRODLIKE_STABILITY_FAILURE &&
    manifest.prodlikeRollbackOnFailure === PRODLIKE_ROLLBACK_ON_FAILURE &&
    manifest.promotionTarget === PROMOTION_TARGET &&
    manifest.promotionApproved === PROMOTION_APPROVED &&
    manifest.changeRecordId === CHANGE_RECORD_ID &&
    manifest.releaseNotesRequired === RELEASE_NOTES_REQUIRED &&
    manifest.releaseNotesStatus === RELEASE_NOTES_STATUS &&
    manifest.approvalRequired === APPROVAL_REQUIRED &&
    manifest.approvalStatus === APPROVAL_STATUS &&
    manifest.approvedBy === APPROVED_BY &&
    manifest.approvalReason === APPROVAL_REASON &&
    manifest.deploymentWindowStatus === DEPLOYMENT_WINDOW_STATUS &&
    manifest.changeFreezeActive === CHANGE_FREEZE_ACTIVE &&
    manifest.freezeReason === FREEZE_REASON
  );
}

function logInfo(message, details = {}) {
  if (['info', 'debug'].includes(LOG_LEVEL)) {
    console.log(JSON.stringify({
      level: 'info',
      service: SERVICE_NAME,
      deployTarget: DEPLOY_TARGET,
      imageTag: IMAGE_TAG,
      rollbackMode: ROLLBACK_MODE,
      prodlikeRollbackOnFailure: PRODLIKE_ROLLBACK_ON_FAILURE,
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
    imageTag: IMAGE_TAG,
    rollbackMode: ROLLBACK_MODE,
    prodlikeRollbackOnFailure: PRODLIKE_ROLLBACK_ON_FAILURE,
    message,
    ...details
  }));
}

function recordMetrics(path, statusCode) {
  if (METRICS_ENABLED !== 'true') return;

  metrics.totalRequests += 1;
  metrics.requestsByPath[path] = (metrics.requestsByPath[path] || 0) + 1;
  metrics.statusCodes[String(statusCode)] = (metrics.statusCodes[String(statusCode)] || 0) + 1;
}

function currentErrorCount() {
  return Object.entries(metrics.statusCodes)
    .filter(([statusCode]) => statusCode.startsWith('5'))
    .reduce((sum, [, count]) => sum + count, 0);
}

app.use((req, res, next) => {
  const startedAtMs = Date.now();
  const requestId = req.headers['x-request-id'] || createRequestId();

  req.requestId = requestId;
  res.setHeader('X-Request-Id', requestId);

  res.on('finish', () => {
    recordMetrics(req.path, res.statusCode);

    logInfo('request_completed', {
      requestId,
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAtMs
    });
  });

  next();
});

app.get('/health', (req, res) => {
  const manifest = readReleaseManifest();

  res.status(200).json({
    status: 'ok',
    service: SERVICE_NAME,
    environment: APP_ENV,
    deployTarget: DEPLOY_TARGET,
    version: APP_VERSION,
    releaseManifestMatchesRuntime: releaseManifestMatchesRuntime(manifest),
    ...buildMetadata()
  });
});

app.get('/ready', (req, res) => {
  res.status(200).json({
    ready: true,
    service: SERVICE_NAME,
    environment: APP_ENV,
    deployTarget: DEPLOY_TARGET,
    ...buildMetadata()
  });
});

app.get('/metrics', (req, res) => {
  if (METRICS_ENABLED !== 'true') {
    return res.status(404).json({
      error: 'Day 49 metrics disabled',
      service: SERVICE_NAME,
      requestId: req.requestId,
      ...buildMetadata()
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
    errorCount: currentErrorCount(),
    requestId: req.requestId,
    ...buildMetadata()
  });
});

app.get('/api/message', (req, res) => {
  res.status(200).json({
    message: 'Hello from Day 49 backend API',
    service: SERVICE_NAME,
    environment: APP_ENV,
    deployTarget: DEPLOY_TARGET,
    version: APP_VERSION,
    featureFlag: FEATURE_FLAG,
    requestId: req.requestId,
    ...buildMetadata()
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
    requestId: req.requestId,
    ...buildMetadata()
  });
});

app.get('/api/release', (req, res) => {
  const manifest = readReleaseManifest();

  res.status(200).json({
    service: SERVICE_NAME,
    environment: APP_ENV,
    deployTarget: DEPLOY_TARGET,
    runtimeMetadata: buildMetadata(),
    imageReleaseManifest: manifest,
    releaseManifestMatchesRuntime: releaseManifestMatchesRuntime(manifest),
    requestId: req.requestId
  });
});

app.get('/api/stability', (req, res) => {
  const manifest = readReleaseManifest();
  const forcedFailure = stabilityForcedToFail();

  const responseBody = {
    stable: !forcedFailure,
    service: SERVICE_NAME,
    environment: APP_ENV,
    deployTarget: DEPLOY_TARGET,
    currentImageTag: IMAGE_TAG,
    rollbackImageTag: ROLLBACK_IMAGE_TAG,
    rollbackMode: ROLLBACK_MODE,
    uptimeSeconds: Math.floor(process.uptime()),
    errorCount: currentErrorCount(),
    totalRequests: metrics.totalRequests,
    stabilityCheckWindowSeconds: STABILITY_CHECK_WINDOW_SECONDS,
    stabilityCheckIntervalSeconds: STABILITY_CHECK_INTERVAL_SECONDS,
    forceStabilityFailure: FORCE_STABILITY_FAILURE === 'true',
    forceProdlikeStabilityFailure: FORCE_PRODLIKE_STABILITY_FAILURE === 'true',
    prodlikeRollbackOnFailure: PRODLIKE_ROLLBACK_ON_FAILURE === 'true',
    releaseManifestMatchesRuntime: releaseManifestMatchesRuntime(manifest),
    requestId: req.requestId
  };

  if (forcedFailure) {
    logError('day49_stability_forced_failure', {
      requestId: req.requestId,
      deployTarget: DEPLOY_TARGET,
      imageTag: IMAGE_TAG
    });

    return res.status(500).json({
      ...responseBody,
      error: 'Day 49 forced stability failure'
    });
  }

  return res.status(200).json(responseBody);
});

app.get('/api/change-record', (req, res) => {
  const manifest = readReleaseManifest();

  res.status(200).json({
    changeRecordReady: releaseNotesReady(),
    service: SERVICE_NAME,
    environment: APP_ENV,
    deployTarget: DEPLOY_TARGET,
    changeRecordId: CHANGE_RECORD_ID,
    releaseNotesRequired: RELEASE_NOTES_REQUIRED === 'true',
    releaseNotesStatus: RELEASE_NOTES_STATUS,
    releaseNotesReady: releaseNotesReady(),
    imageTag: IMAGE_TAG,
    gitCommit: GIT_COMMIT,
    buildNumber: BUILD_NUMBER,
    releaseManifestMatchesRuntime: releaseManifestMatchesRuntime(manifest),
    requestId: req.requestId
  });
});

app.get('/api/approval-record', (req, res) => {
  const manifest = readReleaseManifest();

  res.status(200).json({
    approvalRecordReady: approvalReady(),
    service: SERVICE_NAME,
    environment: APP_ENV,
    deployTarget: DEPLOY_TARGET,
    changeRecordId: CHANGE_RECORD_ID,
    approvalRequired: APPROVAL_REQUIRED === 'true',
    approvalStatus: APPROVAL_STATUS,
    approvedBy: APPROVED_BY,
    approvalReason: APPROVAL_REASON,
    imageTag: IMAGE_TAG,
    gitCommit: GIT_COMMIT,
    buildNumber: BUILD_NUMBER,
    releaseManifestMatchesRuntime: releaseManifestMatchesRuntime(manifest),
    requestId: req.requestId
  });
});

app.get('/api/deployment-window', (req, res) => {
  const manifest = readReleaseManifest();

  res.status(200).json({
    deploymentWindowReady: deploymentWindowReady(),
    service: SERVICE_NAME,
    environment: APP_ENV,
    deployTarget: DEPLOY_TARGET,
    changeRecordId: CHANGE_RECORD_ID,
    deploymentWindowStatus: DEPLOYMENT_WINDOW_STATUS,
    changeFreezeActive: CHANGE_FREEZE_ACTIVE === 'true',
    freezeReason: FREEZE_REASON,
    imageTag: IMAGE_TAG,
    gitCommit: GIT_COMMIT,
    buildNumber: BUILD_NUMBER,
    releaseManifestMatchesRuntime: releaseManifestMatchesRuntime(manifest),
    requestId: req.requestId
  });
});

app.get('/api/prodlike-safety', (req, res) => {
  const manifest = readReleaseManifest();
  const forcedFailure = stabilityForcedToFail();

  res.status(forcedFailure ? 500 : 200).json({
    prodlikeSafetyReady: !forcedFailure,
    service: SERVICE_NAME,
    environment: APP_ENV,
    deployTarget: DEPLOY_TARGET,
    currentImageTag: IMAGE_TAG,
    rollbackImageTag: ROLLBACK_IMAGE_TAG,
    rollbackMode: ROLLBACK_MODE,
    prodlikeRollbackOnFailure: PRODLIKE_ROLLBACK_ON_FAILURE === 'true',
    forceProdlikeStabilityFailure: FORCE_PRODLIKE_STABILITY_FAILURE === 'true',
    releaseManifestMatchesRuntime: releaseManifestMatchesRuntime(manifest),
    requestId: req.requestId,
    error: forcedFailure ? 'Day 49 prodlike safety check failed' : null
  });
});

app.get('/api/promotion-ready', (req, res) => {
  const manifest = readReleaseManifest();
  const manifestMatches = releaseManifestMatchesRuntime(manifest);
  const stableEnough = FORCE_STABILITY_FAILURE === 'false';

  const promotionAllowed =
    PROMOTION_TARGET === 'prodlike' &&
    PROMOTION_APPROVED === 'true' &&
    stableEnough &&
    manifestMatches &&
    releaseNotesReady() &&
    approvalReady() &&
    deploymentWindowReady();

  res.status(200).json({
    promotionReady: promotionAllowed,
    service: SERVICE_NAME,
    environment: APP_ENV,
    deployTarget: DEPLOY_TARGET,
    promotionTarget: PROMOTION_TARGET,
    promotionApproved: PROMOTION_APPROVED === 'true',
    stableEnough,
    releaseNotesReady: releaseNotesReady(),
    approvalReady: approvalReady(),
    deploymentWindowReady: deploymentWindowReady(),
    deploymentWindowStatus: DEPLOYMENT_WINDOW_STATUS,
    changeFreezeActive: CHANGE_FREEZE_ACTIVE === 'true',
    freezeReason: FREEZE_REASON,
    approvalStatus: APPROVAL_STATUS,
    approvedBy: APPROVED_BY,
    changeRecordId: CHANGE_RECORD_ID,
    releaseManifestMatchesRuntime: manifestMatches,
    currentImageTag: IMAGE_TAG,
    requestId: req.requestId
  });
});

app.get('/api/error-test', (req, res) => {
  logError('controlled_error_test_triggered', {
    requestId: req.requestId,
    path: req.originalUrl
  });

  res.status(500).json({
    error: 'Day 49 controlled error test',
    service: SERVICE_NAME,
    deployTarget: DEPLOY_TARGET,
    requestId: req.requestId,
    ...buildMetadata()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  const manifest = readReleaseManifest();

  console.log(`${SERVICE_NAME} listening on port ${PORT}`);
  console.log(`Environment: ${APP_ENV}`);
  console.log(`Deploy target: ${DEPLOY_TARGET}`);
  console.log(`Image tag: ${IMAGE_TAG}`);
  console.log(`Rollback image tag: ${ROLLBACK_IMAGE_TAG}`);
  console.log(`Prodlike rollback on failure: ${PRODLIKE_ROLLBACK_ON_FAILURE}`);
  console.log(`Force prodlike stability failure: ${FORCE_PRODLIKE_STABILITY_FAILURE}`);
  console.log(`Release manifest matches runtime: ${releaseManifestMatchesRuntime(manifest)}`);
});
