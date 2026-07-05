# DevOps Day 45

## Goal

Day 45 introduces a staging-to-prodlike promotion gate.

Day 44 added automatic rollback on monitoring failure.

Day 45 adds promotion control:

    PROMOTION_TARGET
    PROMOTION_APPROVED
    PROMOTE_TO_PRODLIKE
    /api/promotion-ready

## Project Structure

    devops-day45/
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
      deployment-audit/
        .gitkeep
      .env
      .env.staging
      .env.prodlike
      .env.rollback
      .env.example
      docker-compose.yml
      Jenkinsfile
      README.md

## Backend Endpoints

    GET /health
    GET /ready
    GET /metrics
    GET /api/message
    GET /api/config
    GET /api/release
    GET /api/rollback-ready
    GET /api/stability
    GET /api/promotion-ready
    GET /api/error-test

## New Day 45 Endpoint

    GET /api/promotion-ready

Example staging response when promotion is approved:

    {
      "promotionReady": true,
      "service": "day45-backend",
      "environment": "day45-staging-env",
      "deployTarget": "staging",
      "promotionTarget": "prodlike",
      "promotionApproved": true,
      "stableEnough": true,
      "releaseManifestMatchesRuntime": true
    }

## Jenkins Parameters

    PROMOTE_TO_PRODLIKE = false / true
    FORCE_STAGING_STABILITY_FAILURE = false / true

Normal staging-only run:

    PROMOTE_TO_PRODLIKE = false
    FORCE_STAGING_STABILITY_FAILURE = false

Promotion run:

    PROMOTE_TO_PRODLIKE = true
    FORCE_STAGING_STABILITY_FAILURE = false

Blocked-promotion failure test:

    PROMOTE_TO_PRODLIKE = true
    FORCE_STAGING_STABILITY_FAILURE = true

Expected result:

    Staging monitoring fails.
    Promotion is blocked.
    Jenkins fails before prodlike deployment.

## Manual Commands

Run staging:

    docker compose --env-file .env.staging up -d --build

Check promotion readiness:

    docker exec day45_backend sh -c "wget -qO- --header='X-Request-Id: manual-day45-promotion' http://127.0.0.1:3000/api/promotion-ready"

Check stability:

    docker exec day45_backend sh -c "wget -qO- --header='X-Request-Id: manual-day45-stability' http://127.0.0.1:3000/api/stability"

## Jenkins Day 45 Pipeline

The pipeline:

1. Builds staging image.
2. Builds prodlike image.
3. Builds rollback image.
4. Deploys staging candidate.
5. Runs staging monitoring gate.
6. Verifies promotion readiness.
7. Promotes to prodlike only if PROMOTE_TO_PRODLIKE=true.
8. Verifies final deployment state.
9. Writes promotion-aware audit evidence.
10. Packages and archives evidence.

## Important Day 45 Learning

Promotion should be based on evidence, not hope.

Day 45 teaches the DevOps rule:

    A release should only move forward after the previous environment proves it is healthy and stable.

## Promotion Gate

Day 45 demonstrates a staging-to-prodlike promotion gate.

The application exposes a promotion readiness endpoint at `/api/promotion-ready`.

Promotion is allowed only when the staging deployment is healthy, the release manifest matches the runtime configuration, `DAY45_PROMOTION_TARGET=prodlike`, and `DAY45_PROMOTION_APPROVED=true`.

The Jenkins parameter `PROMOTE_TO_PRODLIKE` controls whether the pipeline promotes the verified staging candidate to the prodlike environment.
