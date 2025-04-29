@echo off
echo ===== Portfolio Viewer =====
echo.
echo This script will open all versions of your portfolio for testing
echo.

echo Opening regular portfolio...
start "" "index.html"

echo Opening alternative portfolio...
start "" "index_alternative.html"

echo Opening simplified portfolio...
start "" "simple.html"

echo Opening test page...
start "" "test.html"

echo.
echo If any version displays correctly, you can use it for GitHub Pages.
echo.
echo 1. For the regular version: Keep using index.html
echo 2. For the alternative version: Rename index_alternative.html to index.html
echo 3. For the simplified version: Rename simple.html to index.html
echo.
echo After choosing which version works best, run deploy.bat to push to GitHub.
echo.
pause 