#!/bin/bash
# set -exo

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

if [ -f config.env ]; then
  export $(cat config.env | sed 's/#.*//g' | xargs)
fi

docker-compose -f docker-compose-mongo-db.yml --env-file=config.env up -d --remove-orphans
${SCRIPT_DIR}/utils/wait-for-it.sh ${MONGO_URL}:${MONGO_PORT} --strict --timeout=10 -- echo "MongoDB is up"
