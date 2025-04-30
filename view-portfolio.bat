@echo off
echo ===== Portfolio Local Viewer =====

REM Check if node is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed or not in your PATH.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Starting local server...
echo Your portfolio will be available at: http://localhost:3000/
echo Press Ctrl+C to stop the server

REM Run the server
node server.js

pause 