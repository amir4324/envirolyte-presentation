@echo off
if "%~1"=="-Z1" (
  tar -tf "%~2"
  exit /b
)
if "%~1"=="-p" (
  tar -xOf "%~2" "%~3"
  exit /b
)
echo Unsupported unzip arguments 1>&2
exit /b 2
