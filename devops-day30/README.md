# DevOps Day 30

## Goal

Day 30 introduces `.env` configuration with Docker Compose and Jenkins validation.

Instead of hardcoding environment values directly in `docker-compose.yml`, Day 30 stores configuration values in a `.env` file.

## Project Structure

```text
devops-day30/
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
