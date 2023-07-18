#!/bin/bash
# set -exo

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
MONGO_VERSION="latest"

if [ -f config.env ]; then
  export $(cat config.env | sed 's/#.*//g' | xargs)
fi

if [[ -z `cat /proc/cpuinfo | grep avx` ]]; then
  if command -v docker-compose &> /dev/null; then
    docker-compose -f docker-compose-mongo-db-noavx.yml --env-file=config.env up -d --remove-orphans
  else
      docker compose -f docker-compose-mongo-db-noavx.yml --env-file=config.env up -d --remove-orphans
  fi
else
  if command -v docker-compose &> /dev/null; then
    docker-compose -f docker-compose-mongo-db.yml --env-file=config.env up -d --remove-orphans
  else
      docker compose -f docker-compose-mongo-db.yml --env-file=config.env up -d --remove-orphans
  fi
fi


${SCRIPT_DIR}/utils/wait-for-it.sh ${MONGO_URL}:${MONGO_PORT} --strict --timeout=10 -- echo "MongoDB is up"
