#!/bin/bash
echo "create public directory"
mkdir -p backend/public

echo "go to front end"
cd frontend

echo "install front end deps"
npm i

echo "build front end"

npm run build

echo "move build"
mv ./dist/* ../backend/public/

echo "go to backend"
cd ../backend
npm i