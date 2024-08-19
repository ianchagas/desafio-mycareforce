#!/bin/bash

docker-compose up --build -d
echo "Waiting for docker containers to start"

sleep 3

cd server
echo "Installing backend..."
yarn install

echo "Starting backend..."
yarn start:dev &

sleep 5

cd ../client
echo "Installing frontend..."
yarn install

echo "Starting frontend..."
yarn start &

wait