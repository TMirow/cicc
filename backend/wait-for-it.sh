#!/usr/bin/env bash
# Source: https://github.com/vishnubob/wait-for-it
host="$1"
port="$2"

echo "[WAIT] Waiting for $host:$port..."
while ! nc -z $host $port; do
  sleep 1
done

echo "[WAIT] $host:$port is up!"
