FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG DAY45_SERVICE_NAME=day45-backend
ARG DAY45_DEPLOY_TARGET=local
ARG DAY45_APP_VERSION=local
ARG DAY45_BUILD_NUMBER=local
ARG DAY45_GIT_COMMIT=local
ARG DAY45_IMAGE_TAG=day45-local
ARG DAY45_RELEASE_CREATED_AT=local
ARG DAY45_ROLLBACK_IMAGE_TAG=day45-none
ARG DAY45_ROLLBACK_MODE=normal
ARG DAY45_STABILITY_CHECK_WINDOW_SECONDS=15
ARG DAY45_STABILITY_CHECK_INTERVAL_SECONDS=5
ARG DAY45_FORCE_STABILITY_FAILURE=false
ARG DAY45_PROMOTION_TARGET=none
ARG DAY45_PROMOTION_APPROVED=false

RUN printf '{\n  "service": "%s",\n  "deployTarget": "%s",\n  "appVersion": "%s",\n  "buildNumber": "%s",\n  "gitCommit": "%s",\n  "imageTag": "%s",\n  "releaseCreatedAt": "%s",\n  "rollbackImageTag": "%s",\n  "rollbackMode": "%s",\n  "stabilityCheckWindowSeconds": "%s",\n  "stabilityCheckIntervalSeconds": "%s",\n  "forceStabilityFailure": "%s",\n  "promotionTarget": "%s",\n  "promotionApproved": "%s"\n}\n' \
  "$DAY45_SERVICE_NAME" \
  "$DAY45_DEPLOY_TARGET" \
  "$DAY45_APP_VERSION" \
  "$DAY45_BUILD_NUMBER" \
  "$DAY45_GIT_COMMIT" \
  "$DAY45_IMAGE_TAG" \
  "$DAY45_RELEASE_CREATED_AT" \
  "$DAY45_ROLLBACK_IMAGE_TAG" \
  "$DAY45_ROLLBACK_MODE" \
  "$DAY45_STABILITY_CHECK_WINDOW_SECONDS" \
  "$DAY45_STABILITY_CHECK_INTERVAL_SECONDS" \
  "$DAY45_FORCE_STABILITY_FAILURE" \
  "$DAY45_PROMOTION_TARGET" \
  "$DAY45_PROMOTION_APPROVED" \
  > /app/release.json

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1

CMD ["node", "app.js"]
