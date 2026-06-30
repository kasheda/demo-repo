FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG DAY41_SERVICE_NAME=day41-backend
ARG DAY41_DEPLOY_TARGET=local
ARG DAY41_APP_VERSION=local
ARG DAY41_BUILD_NUMBER=local
ARG DAY41_GIT_COMMIT=local
ARG DAY41_IMAGE_TAG=day41-local
ARG DAY41_RELEASE_CREATED_AT=local

RUN printf '{\n  "service": "%s",\n  "deployTarget": "%s",\n  "appVersion": "%s",\n  "buildNumber": "%s",\n  "gitCommit": "%s",\n  "imageTag": "%s",\n  "releaseCreatedAt": "%s"\n}\n' \
  "$DAY41_SERVICE_NAME" \
  "$DAY41_DEPLOY_TARGET" \
  "$DAY41_APP_VERSION" \
  "$DAY41_BUILD_NUMBER" \
  "$DAY41_GIT_COMMIT" \
  "$DAY41_IMAGE_TAG" \
  "$DAY41_RELEASE_CREATED_AT" \
  > /app/release.json

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1

CMD ["node", "app.js"]
