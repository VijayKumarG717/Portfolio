@echo off
echo ===== GitHub Pages Deployment =====

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed or not in your PATH.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Building and deploying your portfolio to GitHub Pages...
echo This will update your live site at: https://vijaykumarg717.github.io/Portfolio/

REM Deploy to GitHub Pages
call npm run deploy

echo.
echo Deployment complete! Your site should be updated in a few minutes.
echo Visit https://vijaykumarg717.github.io/Portfolio/ to see your site.

pause 