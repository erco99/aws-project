#!/bin/bash
# set -exo

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

if [ -f "${SCRIPT_DIR}/utils/.env" ]; then
  export $(cat "${SCRIPT_DIR}/utils/.env" | sed 's/#.*//g' | xargs)
fi

docker compose -f docker-compose-mongo-db.yml up -d --remove-orphans
${SCRIPT_DIR}/utils/wait-for-it.sh ${MONGO_URL}:${MONGO_PORT} --strict --timeout=10 -- echo "MongoDB is up"
# Load db data
echo "Loading database data..."
mongorestore -d aws-project-db -c users ./db-data/aws-project-db/users.bson

if [ $? -eq 0 ]; then
  echo "Data loaded successfully"
  else
  echo "Error loading data"
fi