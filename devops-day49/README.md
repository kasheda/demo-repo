# DevOps Day 49

## Goal

Day 49 introduces post-promotion prodlike monitoring and automatic safety rollback.

Day 48 blocked promotion unless the deployment window was open and no freeze was active.

Day 49 adds:

    FORCE_PRODLIKE_STABILITY_FAILURE
    PRODLIKE_ROLLBACK_ON_FAILURE
    /api/prodlike-safety
    release-notes/day49-prodlike-safety-record.json

## Project Structure

    devops-day49/
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
    GET /api/change-record
    GET /api/approval-record
    GET /api/deployment-window
    GET /api/prodlike-safety
    GET /api/promotion-ready
    GET /api/error-test

## Jenkins Parameters

    PROMOTE_TO_PRODLIKE = false / true
    FORCE_STAGING_STABILITY_FAILURE = false / true
    SKIP_RELEASE_NOTES = false / true
    APPROVAL_STATUS = pending / approved
    APPROVED_BY = release-manager
    APPROVAL_REASON = staging validation passed
    DEPLOYMENT_WINDOW_STATUS = open / closed
    CHANGE_FREEZE_ACTIVE = false / true
    FREEZE_REASON = none
    FORCE_PRODLIKE_STABILITY_FAILURE = false / true
    PRODLIKE_ROLLBACK_ON_FAILURE = true / false

Normal staging-only run:

    PROMOTE_TO_PRODLIKE = false
    FORCE_STAGING_STABILITY_FAILURE = false
    SKIP_RELEASE_NOTES = false
    APPROVAL_STATUS = pending
    DEPLOYMENT_WINDOW_STATUS = closed
    CHANGE_FREEZE_ACTIVE = false
    FREEZE_REASON = none
    FORCE_PRODLIKE_STABILITY_FAILURE = false
    PRODLIKE_ROLLBACK_ON_FAILURE = true

Successful promotion run:

    PROMOTE_TO_PRODLIKE = true
    FORCE_STAGING_STABILITY_FAILURE = false
    SKIP_RELEASE_NOTES = false
    APPROVAL_STATUS = approved
    APPROVED_BY = release-manager
    APPROVAL_REASON = staging validation passed
    DEPLOYMENT_WINDOW_STATUS = open
    CHANGE_FREEZE_ACTIVE = false
    FREEZE_REASON = none
    FORCE_PRODLIKE_STABILITY_FAILURE = false
    PRODLIKE_ROLLBACK_ON_FAILURE = true

Prodlike rollback test:

    PROMOTE_TO_PRODLIKE = true
    FORCE_STAGING_STABILITY_FAILURE = false
    SKIP_RELEASE_NOTES = false
    APPROVAL_STATUS = approved
    APPROVED_BY = release-manager
    APPROVAL_REASON = staging validation passed
    DEPLOYMENT_WINDOW_STATUS = open
    CHANGE_FREEZE_ACTIVE = false
    FREEZE_REASON = none
    FORCE_PRODLIKE_STABILITY_FAILURE = true
    PRODLIKE_ROLLBACK_ON_FAILURE = true

Expected result:

    Staging passes.
    Prodlike promotion happens.
    Prodlike safety monitoring fails.
    Jenkins automatically rolls back to the rollback image.
    Pipeline succeeds because rollback recovery works.

Prodlike failure without rollback test:

    PROMOTE_TO_PRODLIKE = true
    FORCE_PRODLIKE_STABILITY_FAILURE = true
    PRODLIKE_ROLLBACK_ON_FAILURE = false

Expected result:

    Prodlike monitoring fails.
    Rollback is disabled.
    Jenkins fails the pipeline.

## Manual Commands

Run staging:

    docker compose --env-file .env.staging up -d --build

Check prodlike safety:

    docker exec day49_backend sh -c "wget -qO- --header='X-Request-Id: manual-day49-prodlike-safety' http://127.0.0.1:3000/api/prodlike-safety"

Check promotion readiness:

    docker exec day49_backend sh -c "wget -qO- --header='X-Request-Id: manual-day49-promotion' http://127.0.0.1:3000/api/promotion-ready"

## Important Day 49 Learning

Promotion is not the finish line.

After promotion, the prodlike deployment must survive a monitoring window.

Day 49 teaches the DevOps rule:

    A release should be monitored after promotion, and recovery should be automatic if prodlike becomes unsafe.
