#!/bin/bash
mkdir -p backend/public

cd frontend
npm i
npm run build
mv ./dist/* ../backend/public/
cd backend
npm i