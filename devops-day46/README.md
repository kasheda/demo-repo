# DevOps Day 46

## Goal

Day 46 introduces a release notes and change record gate.

Day 45 added staging-to-prodlike promotion.

Day 46 adds:

    CHANGE_RECORD_ID
    RELEASE_NOTES_REQUIRED
    RELEASE_NOTES_STATUS
    /api/change-record
    release-notes/day46-release-notes.md
    release-notes/day46-change-record.json

## Project Structure

    devops-day46/
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
      release-notes/
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
    GET /api/stability
    GET /api/promotion-ready
    GET /api/change-record
    GET /api/error-test

## Jenkins Parameters

    PROMOTE_TO_PRODLIKE = false / true
    FORCE_STAGING_STABILITY_FAILURE = false / true
    SKIP_RELEASE_NOTES = false / true

Normal staging-only run:

    PROMOTE_TO_PRODLIKE = false
    FORCE_STAGING_STABILITY_FAILURE = false
    SKIP_RELEASE_NOTES = false

Promotion run:

    PROMOTE_TO_PRODLIKE = true
    FORCE_STAGING_STABILITY_FAILURE = false
    SKIP_RELEASE_NOTES = false

Release-notes block test:

    PROMOTE_TO_PRODLIKE = true
    FORCE_STAGING_STABILITY_FAILURE = false
    SKIP_RELEASE_NOTES = true

Expected result:

    Promotion is blocked because release notes are required but missing.

## Manual Commands

Run staging:

    docker compose --env-file .env.staging up -d --build

Check change record:

    docker exec day46_backend sh -c "wget -qO- --header='X-Request-Id: manual-day46-change-record' http://127.0.0.1:3000/api/change-record"

Check promotion readiness:

    docker exec day46_backend sh -c "wget -qO- --header='X-Request-Id: manual-day46-promotion' http://127.0.0.1:3000/api/promotion-ready"

## Important Day 46 Learning

Promotion is not only a technical deployment decision.

A release should also have:

    release notes
    change record
    build number
    Git commit
    image tag
    validation evidence

Day 46 teaches the DevOps rule:

    A promoted release should explain what changed and leave evidence that it was safe to promote.
## Release Notes and Change Record Gate

Day 46 demonstrates a release notes and change record gate before promotion.

The pipeline generates release notes and a change record for each build.

Promotion is allowed only when the change record is valid, release notes are generated, the staging deployment is healthy, and the promotion gate is approved.

The SKIP_RELEASE_NOTES parameter can be used to test the blocking behavior when release notes are intentionally skipped.
