@echo off
echo Checking MongoDB connection...
mongod --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: MongoDB is not installed or not in PATH
    echo Please install MongoDB and try again
    pause
    exit /b 1
)

echo Starting MongoDB...
start mongod

echo Waiting for MongoDB to start...
timeout /t 5 /nobreak

echo Installing backend dependencies...
cd backend
call npm install

echo Starting backend server...
call npm run server

pause 