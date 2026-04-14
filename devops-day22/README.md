# DevOps Day 22

Simple frontend + backend Docker project for Jenkins pipeline validation practice.

## Backend
- Express app
- `/health`
- `/api/message`

## Frontend
- Nginx serves static HTML
- Proxies `/api/` to backend

## Run locally

```bash
docker-compose up --build
