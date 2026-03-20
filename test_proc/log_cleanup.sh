#!/bin/bash

LOG_DIR="./logs"
DAYS_OLD=7

echo "Starting log cleanup..."

find $LOG_DIR -name "*.log" -type f

for file in $(find $LOG_DIR -name "*.log")
do
    echo "Compressing $file"
    gzip $file
done

echo "Removing logs older than $DAYS_OLD days"

find $LOG_DIR -name "*.gz" -mtime +$DAYS_OLD -delete