# DevOps Day 31

## Goal

Day 31 introduces required environment variable validation.

The backend now fails fast if required runtime configuration is missing.

## Project Structure

```text
devops-day31/
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
  docker-compose.yml
  Jenkinsfile
  README.md
