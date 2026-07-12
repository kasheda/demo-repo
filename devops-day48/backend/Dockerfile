FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG DAY48_SERVICE_NAME=day48-backend
ARG DAY48_DEPLOY_TARGET=local
ARG DAY48_APP_VERSION=local
ARG DAY48_BUILD_NUMBER=local
ARG DAY48_GIT_COMMIT=local
ARG DAY48_IMAGE_TAG=day48-local
ARG DAY48_RELEASE_CREATED_AT=local
ARG DAY48_ROLLBACK_IMAGE_TAG=day48-none
ARG DAY48_ROLLBACK_MODE=normal
ARG DAY48_STABILITY_CHECK_WINDOW_SECONDS=15
ARG DAY48_STABILITY_CHECK_INTERVAL_SECONDS=5
ARG DAY48_FORCE_STABILITY_FAILURE=false
ARG DAY48_PROMOTION_TARGET=none
ARG DAY48_PROMOTION_APPROVED=false
ARG DAY48_CHANGE_RECORD_ID=DAY48-CHANGE-local
ARG DAY48_RELEASE_NOTES_REQUIRED=true
ARG DAY48_RELEASE_NOTES_STATUS=draft
ARG DAY48_APPROVAL_REQUIRED=true
ARG DAY48_APPROVAL_STATUS=pending
ARG DAY48_APPROVED_BY=none
ARG DAY48_APPROVAL_REASON=none
ARG DAY48_DEPLOYMENT_WINDOW_STATUS=closed
ARG DAY48_CHANGE_FREEZE_ACTIVE=false
ARG DAY48_FREEZE_REASON=none

RUN printf '{\n  "service": "%s",\n  "deployTarget": "%s",\n  "appVersion": "%s",\n  "buildNumber": "%s",\n  "gitCommit": "%s",\n  "imageTag": "%s",\n  "releaseCreatedAt": "%s",\n  "rollbackImageTag": "%s",\n  "rollbackMode": "%s",\n  "stabilityCheckWindowSeconds": "%s",\n  "stabilityCheckIntervalSeconds": "%s",\n  "forceStabilityFailure": "%s",\n  "promotionTarget": "%s",\n  "promotionApproved": "%s",\n  "changeRecordId": "%s",\n  "releaseNotesRequired": "%s",\n  "releaseNotesStatus": "%s",\n  "approvalRequired": "%s",\n  "approvalStatus": "%s",\n  "approvedBy": "%s",\n  "approvalReason": "%s",\n  "deploymentWindowStatus": "%s",\n  "changeFreezeActive": "%s",\n  "freezeReason": "%s"\n}\n' \
  "$DAY48_SERVICE_NAME" \
  "$DAY48_DEPLOY_TARGET" \
  "$DAY48_APP_VERSION" \
  "$DAY48_BUILD_NUMBER" \
  "$DAY48_GIT_COMMIT" \
  "$DAY48_IMAGE_TAG" \
  "$DAY48_RELEASE_CREATED_AT" \
  "$DAY48_ROLLBACK_IMAGE_TAG" \
  "$DAY48_ROLLBACK_MODE" \
  "$DAY48_STABILITY_CHECK_WINDOW_SECONDS" \
  "$DAY48_STABILITY_CHECK_INTERVAL_SECONDS" \
  "$DAY48_FORCE_STABILITY_FAILURE" \
  "$DAY48_PROMOTION_TARGET" \
  "$DAY48_PROMOTION_APPROVED" \
  "$DAY48_CHANGE_RECORD_ID" \
  "$DAY48_RELEASE_NOTES_REQUIRED" \
  "$DAY48_RELEASE_NOTES_STATUS" \
  "$DAY48_APPROVAL_REQUIRED" \
  "$DAY48_APPROVAL_STATUS" \
  "$DAY48_APPROVED_BY" \
  "$DAY48_APPROVAL_REASON" \
  "$DAY48_DEPLOYMENT_WINDOW_STATUS" \
  "$DAY48_CHANGE_FREEZE_ACTIVE" \
  "$DAY48_FREEZE_REASON" \
  > /app/release.json

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1

CMD ["node", "app.js"]
