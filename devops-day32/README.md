# DevOps Day 32

## Goal

Day 32 introduces Docker Compose health dependencies.

The frontend now waits for the backend to become healthy before starting.

## Project Structure

```text
devops-day32/
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
