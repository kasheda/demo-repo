# DevOps Day 34

## Goal

Day 34 introduces application request logging and Jenkins log verification.

The backend logs request completion events with request IDs, HTTP method, path, status code, and request duration.

## Project Structure

```text
devops-day34/
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
