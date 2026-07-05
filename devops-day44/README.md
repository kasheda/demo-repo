# DevOps Day 44

## Goal

Day 44 introduces automatic rollback on monitoring failure.

Day 43 added a post-deployment monitoring gate.

Day 44 adds:

```text
FORCE_STABILITY_FAILURE
AUTO_ROLLBACK_ON_FAILURE
FORCE_CANDIDATE_STABILITY_FAILURE
Automatic rollback path in Jenkins
Rollback evidence in audit reports

## Post-Deployment Monitoring Gate

Day 44 includes a post-deployment monitoring gate that checks backend stability after deployment.

## Automatic Rollback

Day 44 demonstrates automatic rollback behavior in Jenkins.

If candidate monitoring fails and AUTO_ROLLBACK_ON_FAILURE is true, the pipeline deploys the rollback image using the rollback runtime environment file.

The FORCE_CANDIDATE_STABILITY_FAILURE parameter can be used to intentionally fail the candidate stability check for rollback testing.
