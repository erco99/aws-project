#!/bin/bash

if command -v docker-compose &> /dev/null; then
  docker-compose -f docker-compose-mongo-db.yml --env-file=config.env down --remove-orphans
else
  docker compose -f docker-compose-mongo-db.yml --env-file=config.env down --remove-orphans
fi
