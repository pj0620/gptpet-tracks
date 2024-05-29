#!/bin/bash

# Usage message
usage() {
  echo "Usage: $0 [options]"
  echo "Options:"
  echo "  -s, --skip-docker    Skip starting Docker and Docker-related operations."
  echo "  -h, --help           Display this help message."
}

# Parse command line options
SKIP_DOCKER=0
while [[ "$#" -gt 0 ]]; do
  case $1 in
    -s|--skip-docker) SKIP_DOCKER=1; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1"; usage; exit 1 ;;
  esac
done

SCRIPT_DIR=$(dirname "$0")
cd "$SCRIPT_DIR"

if [ "$SKIP_DOCKER" -eq 0 ]; then
  # Start Docker Daemon
  sudo systemctl start docker

  # Wait for Docker to be fully running
  until sudo systemctl is-active --quiet docker
  do
      echo "Waiting for Docker to start..."
      sleep 1
  done
  echo "Docker is running."

  cd api
  pwd
  echo "Starting Docker images..."
  docker-compose up -d
else
  echo "Skipping Docker operations."
fi

echo "Starting API..."
cd api
npm install && npm run start &

cd ..

echo "Starting Web..."
cd web
npm install && npm run start &
