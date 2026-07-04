FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG DAY43_SERVICE_NAME=day43-backend
ARG DAY43_DEPLOY_TARGET=local
ARG DAY43_APP_VERSION=local
ARG DAY43_BUILD_NUMBER=local
ARG DAY43_GIT_COMMIT=local
ARG DAY43_IMAGE_TAG=day43-local
ARG DAY43_RELEASE_CREATED_AT=local
ARG DAY43_ROLLBACK_IMAGE_TAG=day43-none
ARG DAY43_ROLLBACK_MODE=normal
ARG DAY43_STABILITY_CHECK_WINDOW_SECONDS=15
ARG DAY43_STABILITY_CHECK_INTERVAL_SECONDS=5

RUN printf '{\n  "service": "%s",\n  "deployTarget": "%s",\n  "appVersion": "%s",\n  "buildNumber": "%s",\n  "gitCommit": "%s",\n  "imageTag": "%s",\n  "releaseCreatedAt": "%s",\n  "rollbackImageTag": "%s",\n  "rollbackMode": "%s",\n  "stabilityCheckWindowSeconds": "%s",\n  "stabilityCheckIntervalSeconds": "%s"\n}\n' \
  "$DAY43_SERVICE_NAME" \
  "$DAY43_DEPLOY_TARGET" \
  "$DAY43_APP_VERSION" \
  "$DAY43_BUILD_NUMBER" \
  "$DAY43_GIT_COMMIT" \
  "$DAY43_IMAGE_TAG" \
  "$DAY43_RELEASE_CREATED_AT" \
  "$DAY43_ROLLBACK_IMAGE_TAG" \
  "$DAY43_ROLLBACK_MODE" \
  "$DAY43_STABILITY_CHECK_WINDOW_SECONDS" \
  "$DAY43_STABILITY_CHECK_INTERVAL_SECONDS" \
  > /app/release.json

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1

CMD ["node", "app.js"]
