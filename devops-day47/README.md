# DevOps Day 47

## Goal

Day 47 introduces a release approval gate before prodlike promotion.

Day 46 required release notes and a change record.

Day 47 adds:

    APPROVAL_REQUIRED
    APPROVAL_STATUS
    APPROVED_BY
    APPROVAL_REASON
    /api/approval-record
    release-notes/day47-approval-record.json

## Project Structure

    devops-day47/
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
    GET /api/promotion-ready
    GET /api/error-test

## Jenkins Parameters

    PROMOTE_TO_PRODLIKE = false / true
    FORCE_STAGING_STABILITY_FAILURE = false / true
    SKIP_RELEASE_NOTES = false / true
    APPROVAL_STATUS = pending / approved
    APPROVED_BY = release-manager
    APPROVAL_REASON = staging validation passed

Normal staging-only run:

    PROMOTE_TO_PRODLIKE = false
    FORCE_STAGING_STABILITY_FAILURE = false
    SKIP_RELEASE_NOTES = false
    APPROVAL_STATUS = pending

Promotion run:

    PROMOTE_TO_PRODLIKE = true
    FORCE_STAGING_STABILITY_FAILURE = false
    SKIP_RELEASE_NOTES = false
    APPROVAL_STATUS = approved
    APPROVED_BY = release-manager
    APPROVAL_REASON = staging validation passed

Approval block test:

    PROMOTE_TO_PRODLIKE = true
    FORCE_STAGING_STABILITY_FAILURE = false
    SKIP_RELEASE_NOTES = false
    APPROVAL_STATUS = pending

Expected result:

    Promotion is blocked because approval is required but not approved.

## Manual Commands

Run staging:

    docker compose --env-file .env.staging up -d --build

Check approval record:

    docker exec day47_backend sh -c "wget -qO- --header='X-Request-Id: manual-day47-approval' http://127.0.0.1:3000/api/approval-record"

Check promotion readiness:

    docker exec day47_backend sh -c "wget -qO- --header='X-Request-Id: manual-day47-promotion' http://127.0.0.1:3000/api/promotion-ready"

## Important Day 47 Learning

Promotion should not only have technical proof.

It should also have approval proof:

    who approved it
    why they approved it
    what build they approved
    what commit they approved
    what image tag they approved

Day 47 teaches the DevOps rule:

    A promoted release should have technical evidence and approval evidence.
