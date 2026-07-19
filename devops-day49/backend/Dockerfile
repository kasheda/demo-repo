FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG DAY49_SERVICE_NAME=day49-backend
ARG DAY49_DEPLOY_TARGET=local
ARG DAY49_APP_VERSION=local
ARG DAY49_BUILD_NUMBER=local
ARG DAY49_GIT_COMMIT=local
ARG DAY49_IMAGE_TAG=day49-local
ARG DAY49_RELEASE_CREATED_AT=local
ARG DAY49_ROLLBACK_IMAGE_TAG=day49-none
ARG DAY49_ROLLBACK_MODE=normal
ARG DAY49_STABILITY_CHECK_WINDOW_SECONDS=15
ARG DAY49_STABILITY_CHECK_INTERVAL_SECONDS=5
ARG DAY49_FORCE_STABILITY_FAILURE=false
ARG DAY49_FORCE_PRODLIKE_STABILITY_FAILURE=false
ARG DAY49_PRODLIKE_ROLLBACK_ON_FAILURE=true
ARG DAY49_PROMOTION_TARGET=none
ARG DAY49_PROMOTION_APPROVED=false
ARG DAY49_CHANGE_RECORD_ID=DAY49-CHANGE-local
ARG DAY49_RELEASE_NOTES_REQUIRED=true
ARG DAY49_RELEASE_NOTES_STATUS=draft
ARG DAY49_APPROVAL_REQUIRED=true
ARG DAY49_APPROVAL_STATUS=pending
ARG DAY49_APPROVED_BY=none
ARG DAY49_APPROVAL_REASON=none
ARG DAY49_DEPLOYMENT_WINDOW_STATUS=closed
ARG DAY49_CHANGE_FREEZE_ACTIVE=false
ARG DAY49_FREEZE_REASON=none

RUN printf '{\n  "service": "%s",\n  "deployTarget": "%s",\n  "appVersion": "%s",\n  "buildNumber": "%s",\n  "gitCommit": "%s",\n  "imageTag": "%s",\n  "releaseCreatedAt": "%s",\n  "rollbackImageTag": "%s",\n  "rollbackMode": "%s",\n  "stabilityCheckWindowSeconds": "%s",\n  "stabilityCheckIntervalSeconds": "%s",\n  "forceStabilityFailure": "%s",\n  "forceProdlikeStabilityFailure": "%s",\n  "prodlikeRollbackOnFailure": "%s",\n  "promotionTarget": "%s",\n  "promotionApproved": "%s",\n  "changeRecordId": "%s",\n  "releaseNotesRequired": "%s",\n  "releaseNotesStatus": "%s",\n  "approvalRequired": "%s",\n  "approvalStatus": "%s",\n  "approvedBy": "%s",\n  "approvalReason": "%s",\n  "deploymentWindowStatus": "%s",\n  "changeFreezeActive": "%s",\n  "freezeReason": "%s"\n}\n' \
  "$DAY49_SERVICE_NAME" \
  "$DAY49_DEPLOY_TARGET" \
  "$DAY49_APP_VERSION" \
  "$DAY49_BUILD_NUMBER" \
  "$DAY49_GIT_COMMIT" \
  "$DAY49_IMAGE_TAG" \
  "$DAY49_RELEASE_CREATED_AT" \
  "$DAY49_ROLLBACK_IMAGE_TAG" \
  "$DAY49_ROLLBACK_MODE" \
  "$DAY49_STABILITY_CHECK_WINDOW_SECONDS" \
  "$DAY49_STABILITY_CHECK_INTERVAL_SECONDS" \
  "$DAY49_FORCE_STABILITY_FAILURE" \
  "$DAY49_FORCE_PRODLIKE_STABILITY_FAILURE" \
  "$DAY49_PRODLIKE_ROLLBACK_ON_FAILURE" \
  "$DAY49_PROMOTION_TARGET" \
  "$DAY49_PROMOTION_APPROVED" \
  "$DAY49_CHANGE_RECORD_ID" \
  "$DAY49_RELEASE_NOTES_REQUIRED" \
  "$DAY49_RELEASE_NOTES_STATUS" \
  "$DAY49_APPROVAL_REQUIRED" \
  "$DAY49_APPROVAL_STATUS" \
  "$DAY49_APPROVED_BY" \
  "$DAY49_APPROVAL_REASON" \
  "$DAY49_DEPLOYMENT_WINDOW_STATUS" \
  "$DAY49_CHANGE_FREEZE_ACTIVE" \
  "$DAY49_FREEZE_REASON" \
  > /app/release.json

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1

CMD ["node", "app.js"]
