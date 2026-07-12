FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG DAY47_SERVICE_NAME=day47-backend
ARG DAY47_DEPLOY_TARGET=local
ARG DAY47_APP_VERSION=local
ARG DAY47_BUILD_NUMBER=local
ARG DAY47_GIT_COMMIT=local
ARG DAY47_IMAGE_TAG=day47-local
ARG DAY47_RELEASE_CREATED_AT=local
ARG DAY47_ROLLBACK_IMAGE_TAG=day47-none
ARG DAY47_ROLLBACK_MODE=normal
ARG DAY47_STABILITY_CHECK_WINDOW_SECONDS=15
ARG DAY47_STABILITY_CHECK_INTERVAL_SECONDS=5
ARG DAY47_FORCE_STABILITY_FAILURE=false
ARG DAY47_PROMOTION_TARGET=none
ARG DAY47_PROMOTION_APPROVED=false
ARG DAY47_CHANGE_RECORD_ID=DAY47-CHANGE-local
ARG DAY47_RELEASE_NOTES_REQUIRED=true
ARG DAY47_RELEASE_NOTES_STATUS=draft
ARG DAY47_APPROVAL_REQUIRED=true
ARG DAY47_APPROVAL_STATUS=pending
ARG DAY47_APPROVED_BY=none
ARG DAY47_APPROVAL_REASON=none

RUN printf '{\n  "service": "%s",\n  "deployTarget": "%s",\n  "appVersion": "%s",\n  "buildNumber": "%s",\n  "gitCommit": "%s",\n  "imageTag": "%s",\n  "releaseCreatedAt": "%s",\n  "rollbackImageTag": "%s",\n  "rollbackMode": "%s",\n  "stabilityCheckWindowSeconds": "%s",\n  "stabilityCheckIntervalSeconds": "%s",\n  "forceStabilityFailure": "%s",\n  "promotionTarget": "%s",\n  "promotionApproved": "%s",\n  "changeRecordId": "%s",\n  "releaseNotesRequired": "%s",\n  "releaseNotesStatus": "%s",\n  "approvalRequired": "%s",\n  "approvalStatus": "%s",\n  "approvedBy": "%s",\n  "approvalReason": "%s"\n}\n' \
  "$DAY47_SERVICE_NAME" \
  "$DAY47_DEPLOY_TARGET" \
  "$DAY47_APP_VERSION" \
  "$DAY47_BUILD_NUMBER" \
  "$DAY47_GIT_COMMIT" \
  "$DAY47_IMAGE_TAG" \
  "$DAY47_RELEASE_CREATED_AT" \
  "$DAY47_ROLLBACK_IMAGE_TAG" \
  "$DAY47_ROLLBACK_MODE" \
  "$DAY47_STABILITY_CHECK_WINDOW_SECONDS" \
  "$DAY47_STABILITY_CHECK_INTERVAL_SECONDS" \
  "$DAY47_FORCE_STABILITY_FAILURE" \
  "$DAY47_PROMOTION_TARGET" \
  "$DAY47_PROMOTION_APPROVED" \
  "$DAY47_CHANGE_RECORD_ID" \
  "$DAY47_RELEASE_NOTES_REQUIRED" \
  "$DAY47_RELEASE_NOTES_STATUS" \
  "$DAY47_APPROVAL_REQUIRED" \
  "$DAY47_APPROVAL_STATUS" \
  "$DAY47_APPROVED_BY" \
  "$DAY47_APPROVAL_REASON" \
  > /app/release.json

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1

CMD ["node", "app.js"]
