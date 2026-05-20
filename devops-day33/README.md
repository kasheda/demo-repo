# DevOps Day 33

## Goal

Day 33 introduces `.env.example` and configuration drift validation.

The app still uses `.env` for runtime values, but `.env.example` documents which keys are required.

Jenkins checks that `.env` and `.env.example` contain the same keys.

## Project Structure

```text
devops-day33/
  backend/
    app.js
    package.json
    Dockerfile
    .dockerignore
  frontend/
    index.html
    nginx.conf
    Dockerfile
    .dockerignore
  .env
  .env.example
  docker-compose.yml
  Jenkinsfile
  README.md
