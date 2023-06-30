@echo off

set SCRIPT_PATH=%~dp0
set OUTDIR=%SCRIPT_PATH%\db-data\
set DBNAME="aws-project-db"

for /F %%i in ('dir /b %OUTDIR%') do (
    goto NOTEMPTY
)
goto EMPTY

:NOTEMPTY
echo Output directory is not empty, found data inside:
tree %OUTDIR% /f
setlocal
:PROMPT
SET /P YN=Would you like to overwrite data[Yes/No]?
IF /I "%YN%" NEQ "y" GOTO NOTYES
   goto END
:NOTYES
IF /I "%YN%" NEQ "n" GOTO PROMPT
   echo No data has been modified
   goto :EOF
:END
endlocal

:EMPTY
mongodump -d %DBNAME% -o %OUTDIR%