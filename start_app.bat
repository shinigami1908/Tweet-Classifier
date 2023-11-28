@echo off

rem Start Backend
start cmd /k "cd C:\Programming\VSC\Projects\Tweet Classifier\backend\src && python app.py"

rem Start Frontend
start cmd /k "cd C:\Programming\VSC\Projects\Tweet Classifier\frontend && npm start"