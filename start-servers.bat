@echo off
echo Starting Backend Server...
start cmd /k "cd backend && npm run server"

echo Starting Frontend Server...
start cmd /k "npm start"

echo Both servers are starting...
echo Backend will be available at http://localhost:5000
echo Frontend will be available at http://localhost:3000 