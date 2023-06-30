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

mongodump -d "${DBNAME}" -o "${OUTDIR}"


