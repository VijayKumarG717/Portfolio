@echo off
echo ===== Portfolio GitHub Deployment Script =====
echo.

REM Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Git is not installed or not in your PATH.
    echo Please install Git from https://git-scm.com/download/win
    pause
    exit /b 1
)

REM Prompt for GitHub username
set /p GITHUB_USERNAME=Enter your GitHub username: 

echo.
echo Setting up repository...

REM Initialize git repository if not already initialized
if not exist .git (
    git init
    echo Git repository initialized.
) else (
    echo Git repository already exists.
)

REM Add all files
git add .
echo Files staged for commit.

REM Commit changes
set /p COMMIT_MESSAGE=Enter commit message (or press Enter for default): 
if "%COMMIT_MESSAGE%"=="" set COMMIT_MESSAGE=Update portfolio website

git commit -m "%COMMIT_MESSAGE%"
echo Changes committed.

REM Set up remote if not already set
git remote -v | find "origin" >nul
if %ERRORLEVEL% NEQ 0 (
    git remote add origin https://github.com/%GITHUB_USERNAME%/Portfolio.git
    echo Remote origin added.
) else (
    echo Remote origin already exists.
)

REM Ensure we're on the main branch
git branch -M main
echo Set main as default branch.

REM Push to GitHub
echo.
echo Pushing to GitHub...
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Push failed. You might need to:
    echo 1. Create a repository named 'Portfolio' on GitHub first
    echo 2. Check your credentials
    echo 3. Run 'git push -f origin main' manually if you need to force push
) else (
    echo.
    echo Successfully pushed to GitHub!
    echo Your portfolio should be available at: https://%GITHUB_USERNAME%.github.io/Portfolio/
    echo.
    echo Note: It may take a few minutes for GitHub Pages to deploy your site.
    echo Remember to check the GitHub repository settings to ensure GitHub Pages is enabled.
)

echo.
pause 