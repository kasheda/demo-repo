# DevOps Day 35

## Goal

Day 35 introduces lightweight application metrics.

The backend now tracks request counters and exposes them through `/metrics`.

## Project Structure

```text
devops-day35/
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
