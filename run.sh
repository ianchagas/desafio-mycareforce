#!/bin/bash

cd server
yarn start:dev &

cd ../client
yarn start &

wait