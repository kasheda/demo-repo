FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG DAY44_SERVICE_NAME=day44-backend
ARG DAY44_DEPLOY_TARGET=local
ARG DAY44_APP_VERSION=local
ARG DAY44_BUILD_NUMBER=local
ARG DAY44_GIT_COMMIT=local
ARG DAY44_IMAGE_TAG=day44-local
ARG DAY44_RELEASE_CREATED_AT=local
ARG DAY44_ROLLBACK_IMAGE_TAG=day44-none
ARG DAY44_ROLLBACK_MODE=normal
ARG DAY44_STABILITY_CHECK_WINDOW_SECONDS=15
ARG DAY44_STABILITY_CHECK_INTERVAL_SECONDS=5
ARG DAY44_FORCE_STABILITY_FAILURE=false

RUN printf '{\n  "service": "%s",\n  "deployTarget": "%s",\n  "appVersion": "%s",\n  "buildNumber": "%s",\n  "gitCommit": "%s",\n  "imageTag": "%s",\n  "releaseCreatedAt": "%s",\n  "rollbackImageTag": "%s",\n  "rollbackMode": "%s",\n  "stabilityCheckWindowSeconds": "%s",\n  "stabilityCheckIntervalSeconds": "%s",\n  "forceStabilityFailure": "%s"\n}\n' \
  "$DAY44_SERVICE_NAME" \
  "$DAY44_DEPLOY_TARGET" \
  "$DAY44_APP_VERSION" \
  "$DAY44_BUILD_NUMBER" \
  "$DAY44_GIT_COMMIT" \
  "$DAY44_IMAGE_TAG" \
  "$DAY44_RELEASE_CREATED_AT" \
  "$DAY44_ROLLBACK_IMAGE_TAG" \
  "$DAY44_ROLLBACK_MODE" \
  "$DAY44_STABILITY_CHECK_WINDOW_SECONDS" \
  "$DAY44_STABILITY_CHECK_INTERVAL_SECONDS" \
  "$DAY44_FORCE_STABILITY_FAILURE" \
  > /app/release.json

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1

CMD ["node", "app.js"]
