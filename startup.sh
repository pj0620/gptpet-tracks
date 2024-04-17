#!/bin/bash

SCRIPT_DIR=$(dirname "$0")
cd "$SCRIPT_DIR"

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
echo starting docker images
docker-compose up -d

echo starting api
npm run install && npm run start &

cd ..

echo starting web 
cd web
pwd
npm run install && npm run start
