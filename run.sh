#!/usr/bin/env bash

set -euo pipefail

export RICKANDMORTY_VERSION=${1:-latest}

docker build -t rickandmorty:${RICKANDMORTY_VERSION} .

docker-compose up
