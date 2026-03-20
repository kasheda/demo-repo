#!/bin/bash

HEALTH_THRESHOLD=50
WARN_THRESHOLD=80

USAGE=$(df -h / | awk 'NR==2 {print $6}' | sed 's/%//')

echo "Current disk usage: $USAGE%"

if [ "$USAGE" -lt "$HEALTH_THRESHOLD" ]; then
    echo "Healthy"
elif [ "$USAGE" -ge "$HEALTH_THRESHOLD" ] && [ "$USAGE" -lt "$WARN_THRESHOLD" ]; then
    echo "Warning"
else
    echo "Disk usage high"
fi