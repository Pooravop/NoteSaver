@echo off
echo Checking backend server status...

curl -s http://localhost:5000 >nul 2>&1
if %errorlevel% equ 0 (
    echo Backend server is running on http://localhost:5000
) else (
    echo Backend server is not running
    echo Please run start-backend.bat to start the server
)

pause 