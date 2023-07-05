@echo off

docker compose -f docker-compose-mongo-db.yml --env-file=config.env down --remove-orphans