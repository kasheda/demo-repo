FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG DAY46_SERVICE_NAME=day46-backend
ARG DAY46_DEPLOY_TARGET=local
ARG DAY46_APP_VERSION=local
ARG DAY46_BUILD_NUMBER=local
ARG DAY46_GIT_COMMIT=local
ARG DAY46_IMAGE_TAG=day46-local
ARG DAY46_RELEASE_CREATED_AT=local
ARG DAY46_ROLLBACK_IMAGE_TAG=day46-none
ARG DAY46_ROLLBACK_MODE=normal
ARG DAY46_STABILITY_CHECK_WINDOW_SECONDS=15
ARG DAY46_STABILITY_CHECK_INTERVAL_SECONDS=5
ARG DAY46_FORCE_STABILITY_FAILURE=false
ARG DAY46_PROMOTION_TARGET=none
ARG DAY46_PROMOTION_APPROVED=false
ARG DAY46_CHANGE_RECORD_ID=DAY46-CHANGE-local
ARG DAY46_RELEASE_NOTES_REQUIRED=true
ARG DAY46_RELEASE_NOTES_STATUS=draft

RUN printf '{\n  "service": "%s",\n  "deployTarget": "%s",\n  "appVersion": "%s",\n  "buildNumber": "%s",\n  "gitCommit": "%s",\n  "imageTag": "%s",\n  "releaseCreatedAt": "%s",\n  "rollbackImageTag": "%s",\n  "rollbackMode": "%s",\n  "stabilityCheckWindowSeconds": "%s",\n  "stabilityCheckIntervalSeconds": "%s",\n  "forceStabilityFailure": "%s",\n  "promotionTarget": "%s",\n  "promotionApproved": "%s",\n  "changeRecordId": "%s",\n  "releaseNotesRequired": "%s",\n  "releaseNotesStatus": "%s"\n}\n' \
  "$DAY46_SERVICE_NAME" \
  "$DAY46_DEPLOY_TARGET" \
  "$DAY46_APP_VERSION" \
  "$DAY46_BUILD_NUMBER" \
  "$DAY46_GIT_COMMIT" \
  "$DAY46_IMAGE_TAG" \
  "$DAY46_RELEASE_CREATED_AT" \
  "$DAY46_ROLLBACK_IMAGE_TAG" \
  "$DAY46_ROLLBACK_MODE" \
  "$DAY46_STABILITY_CHECK_WINDOW_SECONDS" \
  "$DAY46_STABILITY_CHECK_INTERVAL_SECONDS" \
  "$DAY46_FORCE_STABILITY_FAILURE" \
  "$DAY46_PROMOTION_TARGET" \
  "$DAY46_PROMOTION_APPROVED" \
  "$DAY46_CHANGE_RECORD_ID" \
  "$DAY46_RELEASE_NOTES_REQUIRED" \
  "$DAY46_RELEASE_NOTES_STATUS" \
  > /app/release.json

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1

CMD ["node", "app.js"]
