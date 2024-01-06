@echo off
REM Start the frontend in a new window
start "Frontend" cmd /c "cd /D C:\Users\rjfar\OneDrive\Desktop\cheater-db\frontend && npm start"

REM Start the backend in the current window
cd /D "C:\Users\rjfar\OneDrive\Desktop\cheater-db"
node server.js

pause
