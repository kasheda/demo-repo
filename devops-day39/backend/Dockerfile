FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG DAY39_SERVICE_NAME=day39-backend
ARG DAY39_DEPLOY_TARGET=local
ARG DAY39_APP_VERSION=local
ARG DAY39_BUILD_NUMBER=local
ARG DAY39_GIT_COMMIT=local
ARG DAY39_IMAGE_TAG=day39-local
ARG DAY39_RELEASE_CREATED_AT=local

RUN printf '{\n  "service": "%s",\n  "deployTarget": "%s",\n  "appVersion": "%s",\n  "buildNumber": "%s",\n  "gitCommit": "%s",\n  "imageTag": "%s",\n  "releaseCreatedAt": "%s"\n}\n' \
  "$DAY39_SERVICE_NAME" \
  "$DAY39_DEPLOY_TARGET" \
  "$DAY39_APP_VERSION" \
  "$DAY39_BUILD_NUMBER" \
  "$DAY39_GIT_COMMIT" \
  "$DAY39_IMAGE_TAG" \
  "$DAY39_RELEASE_CREATED_AT" \
  > /app/release.json

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1

CMD ["node", "app.js"]
