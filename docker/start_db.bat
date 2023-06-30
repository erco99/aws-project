@echo off

docker-compose -f docker-compose-mongo-db.yml --env-file=config.env up -d --remove-orphans
timeout /t 20 /nobreak