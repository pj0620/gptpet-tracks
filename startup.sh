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

GIT_SSH_COMMAND="ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no" git pull

cd api
echo starting docker images
docker-compose up -d

echo starting api
npm run start &

cd ..

echo starting web 
cd web
npm run start &
