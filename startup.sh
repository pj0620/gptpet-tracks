#!/bin/bash

# Start Docker Daemon
sudo systemctl start docker

# Wait for Docker to be fully running
until sudo systemctl is-active --quiet docker
do
    echo "Waiting for Docker to start..."
    sleep 1
done
echo "Docker is running."

pushd api
docker-compose up -d
npm run start &

popd
pushd web
npm run start &
