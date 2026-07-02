# DevOps Day 42

## Goal

Day 42 introduces safe rollback simulation.

Day 41 packaged deployment evidence as Jenkins artifacts.

Day 42 adds:

```text
.env.rollback
ROLLBACK_IMAGE_TAG
ROLLBACK_MODE
/api/rollback-ready
SIMULATE_ROLLBACK Jenkins parameter
