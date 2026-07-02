FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG DAY42_SERVICE_NAME=day42-backend
ARG DAY42_DEPLOY_TARGET=local
ARG DAY42_APP_VERSION=local
ARG DAY42_BUILD_NUMBER=local
ARG DAY42_GIT_COMMIT=local
ARG DAY42_IMAGE_TAG=day42-local
ARG DAY42_RELEASE_CREATED_AT=local
ARG DAY42_ROLLBACK_IMAGE_TAG=day42-none
ARG DAY42_ROLLBACK_MODE=normal

RUN printf '{\n  "service": "%s",\n  "deployTarget": "%s",\n  "appVersion": "%s",\n  "buildNumber": "%s",\n  "gitCommit": "%s",\n  "imageTag": "%s",\n  "releaseCreatedAt": "%s",\n  "rollbackImageTag": "%s",\n  "rollbackMode": "%s"\n}\n' \
  "$DAY42_SERVICE_NAME" \
  "$DAY42_DEPLOY_TARGET" \
  "$DAY42_APP_VERSION" \
  "$DAY42_BUILD_NUMBER" \
  "$DAY42_GIT_COMMIT" \
  "$DAY42_IMAGE_TAG" \
  "$DAY42_RELEASE_CREATED_AT" \
  "$DAY42_ROLLBACK_IMAGE_TAG" \
  "$DAY42_ROLLBACK_MODE" \
  > /app/release.json

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1

CMD ["node", "app.js"]
