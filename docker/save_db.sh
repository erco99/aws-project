#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
OUTDIR="${SCRIPT_DIR}/db-data"
DBNAME="aws-project-db"

if [ -d "${OUTDIR}" ] && [ "$(ls -A ${OUTDIR})" ]; then
    echo "Output directory is not empty, found data inside:"
    if command -v tree &> /dev/null; then
      tree "${OUTDIR}"
    else
      ls "${OUTDIR}"
    fi
    while true; do
      read -p "Would you like to overwrite data?[Yes/No]" yn
      case $yn in
        [Yy]* ) break;;
        [Nn]* ) echo "No data has been modified"; exit;;
        * ) echo "Please answer yer or no.";;
      esac
    done

fi

if ! command -v mongodump &> /dev/null; then
  echo "ERROR: mongodump command not found!"
  while true; do
      read -p "Would you like to install it?[Yes/No]" yn
      case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yer or no.";;
      esac
  done
  pkexec apt-get install -y mongodb-database-tools
fi

mongodump --host=${MONGO_URL} --port=${MONGO_PORT} -d "${DBNAME}" -o "${OUTDIR}"