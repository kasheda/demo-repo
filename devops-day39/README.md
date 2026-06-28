# DevOps Day 39

## Goal

Day 39 introduces an image-baked release manifest.

Day 38 exposed build metadata through runtime environment variables.

Day 39 goes further by baking release metadata into the backend Docker image at build time as:

```text
/app/release.json
