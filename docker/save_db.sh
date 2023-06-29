#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
OUTDIR="${SCRIPT_DIR}/db-data"
DBNAME="aws-project-db"

mongodump -d "${DBNAME}" -o "${OUTDIR}"


