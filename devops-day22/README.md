# DevOps Day 28

This project demonstrates a basic full-stack Docker Compose deployment with Jenkins pipeline verification.

## Services

- Backend: Node.js / Express
- Frontend: Nginx static frontend
- Reverse proxy: Nginx proxies `/api/` to backend
- CI/CD: Jenkins Pipeline as Code

## Backend Endpoints

```text
GET /health
GET /api/message
