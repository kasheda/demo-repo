# DevOps Day 48

## Goal

Day 48 introduces a deployment window and change-freeze gate before prodlike promotion.

Day 47 required release approval evidence.

Day 48 adds:

    DEPLOYMENT_WINDOW_STATUS
    CHANGE_FREEZE_ACTIVE
    FREEZE_REASON
    /api/deployment-window
    release-notes/day48-deployment-window-record.json

## Project Structure

    devops-day48/
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

Normal staging-only run:

    PROMOTE_TO_PRODLIKE = false
    FORCE_STAGING_STABILITY_FAILURE = false
    SKIP_RELEASE_NOTES = false
    APPROVAL_STATUS = pending
    DEPLOYMENT_WINDOW_STATUS = closed
    CHANGE_FREEZE_ACTIVE = false
    FREEZE_REASON = none

Promotion run:

    PROMOTE_TO_PRODLIKE = true
    FORCE_STAGING_STABILITY_FAILURE = false
    SKIP_RELEASE_NOTES = false
    APPROVAL_STATUS = approved
    APPROVED_BY = release-manager
    APPROVAL_REASON = staging validation passed
    DEPLOYMENT_WINDOW_STATUS = open
    CHANGE_FREEZE_ACTIVE = false
    FREEZE_REASON = none

Window-closed block test:

    PROMOTE_TO_PRODLIKE = true
    FORCE_STAGING_STABILITY_FAILURE = false
    SKIP_RELEASE_NOTES = false
    APPROVAL_STATUS = approved
    DEPLOYMENT_WINDOW_STATUS = closed
    CHANGE_FREEZE_ACTIVE = false
    FREEZE_REASON = none

Expected result:

    Promotion is blocked because deployment window is closed.

Freeze block test:

    PROMOTE_TO_PRODLIKE = true
    FORCE_STAGING_STABILITY_FAILURE = false
    SKIP_RELEASE_NOTES = false
    APPROVAL_STATUS = approved
    DEPLOYMENT_WINDOW_STATUS = open
    CHANGE_FREEZE_ACTIVE = true
    FREEZE_REASON = release-freeze

Expected result:

    Promotion is blocked because change freeze is active.

## Manual Commands

Run staging:

    docker compose --env-file .env.staging up -d --build

Check deployment window:

    docker exec day48_backend sh -c "wget -qO- --header='X-Request-Id: manual-day48-window' http://127.0.0.1:3000/api/deployment-window"

Check promotion readiness:

    docker exec day48_backend sh -c "wget -qO- --header='X-Request-Id: manual-day48-promotion' http://127.0.0.1:3000/api/promotion-ready"

## Important Day 48 Learning

Promotion should not only have technical proof and approval proof.

It should also respect operational controls:

    deployment window
    change freeze
    freeze reason
    release timing

Day 48 teaches the DevOps rule:

    A release can be healthy and approved, but still blocked if the deployment window is closed or a freeze is active.
