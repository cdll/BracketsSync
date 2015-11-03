@echo off

net session >nul 2>&1
if NOT %errorLevel% == 0 (
    echo.
    echo    Oh no! Please run this as an administrator.
    echo.
    pause
    exit
)

echo    -------------------------------------------------
echo    ^|       Welcome to BracketsSync for Windows     ^|
echo    ^|                  by trjstewart                ^|
echo    -------------------------------------------------
echo.
echo     For instructions please visit:
echo            https://github.com/trjstewart/Brackets
echo.
set /p repo="Enter repository location: "
echo.
echo    Removing exiting 'brackets.json' file...
del /f/q "%userprofile%\AppData\Roaming\Brackets\brackets.json"
echo    Done!
echo.
echo    Removing exiting 'extensions' folder...
rd /s/q "%userprofile%\AppData\Roaming\Brackets\extensions"
echo    Done!
echo.
echo    Creating symbolic link to 'brackets.json' file...
echo.
mklink "%userprofile%\AppData\Roaming\Brackets\brackets.json" "%repo%\brackets.json"
echo.
echo    Creating symbolic link to 'extensions' folder...
echo.
mklink /d "%userprofile%\AppData\Roaming\Brackets\extensions" "%repo%\extensions"
echo.
echo    Configuration is complete. Brackets is now linked to your sync location.
echo.
pause