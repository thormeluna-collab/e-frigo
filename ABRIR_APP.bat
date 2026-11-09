@echo off
cd /d "%~dp0"
echo Iniciando RecetaPro...
start http://localhost:4173
npm run preview
pause