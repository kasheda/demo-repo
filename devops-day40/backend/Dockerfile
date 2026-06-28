FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG DAY40_SERVICE_NAME=day40-backend
ARG DAY40_DEPLOY_TARGET=local
ARG DAY40_APP_VERSION=local
ARG DAY40_BUILD_NUMBER=local
ARG DAY40_GIT_COMMIT=local
ARG DAY40_IMAGE_TAG=day40-local
ARG DAY40_RELEASE_CREATED_AT=local

RUN printf '{\n  "service": "%s",\n  "deployTarget": "%s",\n  "appVersion": "%s",\n  "buildNumber": "%s",\n  "gitCommit": "%s",\n  "imageTag": "%s",\n  "releaseCreatedAt": "%s"\n}\n' \
  "$DAY40_SERVICE_NAME" \
  "$DAY40_DEPLOY_TARGET" \
  "$DAY40_APP_VERSION" \
  "$DAY40_BUILD_NUMBER" \
  "$DAY40_GIT_COMMIT" \
  "$DAY40_IMAGE_TAG" \
  "$DAY40_RELEASE_CREATED_AT" \
  > /app/release.json

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1

CMD ["node", "app.js"]
