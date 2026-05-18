# DevOps Day 29

## Goal

Day 29 introduces runtime configuration using environment variables with Docker Compose and Jenkins.

The backend receives runtime values from Docker Compose and Jenkins verifies those values through smoke tests.

## Project Structure

```text
devops-day29/
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
  docker-compose.yml
  Jenkinsfile
  README.md
