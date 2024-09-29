#!/bin/bash
mkdir -p backend/public
cd frontend
npm run build
mv ./dist/* ../backend/public/
