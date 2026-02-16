@echo off
cls
title COLZYS TWEAKS - BASIC PERFORMANCE PACK
REM ============================================================
REM  COLZYS TWEAKS - BASIC PERFORMANCE PACK (V20-STYLE UI)
REM  - Keeps the UI style you liked (ASCII / spacing / menus)
REM  - SAFE + reversible tweaks (no update blockers, no folder nukes)
REM ============================================================

REM --- Ensure folders ---
if not exist "C:\temp\" mkdir "C:\temp\"
if not exist "C:\colzy\" mkdir "C:\colzy\"
if not exist "C:\colzy\resources\" mkdir "C:\colzy\resources\"

echo [-] Creating System Restore Point (Colzys BASIC PERFORMANCE Restore Point)
powershell.exe -Command "Checkpoint-Computer -Description 'Colzys BASIC PERFORMANCE' -RestorePointType 'MODIFY_SETTINGS'" >nul 2>&1
timeout /t 1 >nul

set w=[97m
set p=[95m
set b=[96m

:main
chcp 65001 >nul 2>&1
cls
mode 100,32
color 0
echo.
echo.
echo                ██████╗  ██████╗ ██╗     ███████╗██╗   ██╗
echo                ██╔══██╗██╔═══██╗██║     ╚══███╔╝╚██╗ ██╔╝
echo                ██████╔╝██║   ██║██║       ███╔╝  ╚████╔╝ 
echo                ██╔══██╗██║   ██║██║      ███╔╝    ╚██╔╝  
echo                ██████╔╝╚██████╔╝███████╗███████╗   ██║   
echo                ╚═════╝  ╚═════╝ ╚══════╝╚══════╝   ╚═╝   
echo            --------------------------------------------------------------------------------                                                                         
echo.
echo                       [1] System Tune                        [2] App Cleanup     
echo.
echo                       [3] CPU Boost                          [4] Extras
echo.
echo                       [5] Storage Cleanup                    [6] Input Latency
echo.
echo.
echo                          [D] Discord   [T] TikTok
echo.
set /p choice="Choose an option:"

if "%choice%"=="1" goto windows
if "%choice%"=="2" goto debloat
if "%choice%"=="3" goto cpu
if "%choice%"=="4" goto misc
if "%choice%"=="5" goto clean
if "%choice%"=="6" goto dqsize
if /i "%choice%"=="d" goto discord1
if /i "%choice%"=="t" goto tiktok1
goto main

:windows
cls
echo.
echo               ███████╗██╗   ██╗███████╗████████╗███████╗███╗   ███╗
echo               ██╔════╝╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔════╝████╗ ████║
echo               ███████╗ ╚████╔╝ ███████╗   ██║   █████╗  ██╔████╔██║
echo               ╚════██║  ╚██╔╝  ╚════██║   ██║   ██╔══╝  ██║╚██╔╝██║
echo               ███████║   ██║   ███████║   ██║   ███████╗██║ ╚═╝ ██║
echo               ╚══════╝   ╚═╝   ╚══════╝   ╚═╝   ╚══════╝╚═╝     ╚═╝
echo          -------------------------------------------------------------------
echo.
echo             [1] System Options     [2] Power Options     [3] Update Settings
echo.
echo                    [4] Privacy Controls      [5] UI Responsiveness
echo.
echo                                      [x] Menu
echo.
set /p choice="Choose an option (1-5, x): "

if "%choice%"=="1" goto wsettings
if "%choice%"=="2" goto plan
if "%choice%"=="3" goto wupdate
if "%choice%"=="4" goto privacy
if "%choice%"=="5" goto io
if /i "%choice%"=="x" goto main
goto windows

:wupdate
cls
echo Opening Windows Update settings (recommended to KEEP security updates ON).
start ms-settings:windowsupdate
pause
goto windows

:privacy
cls
REM Safe privacy toggles
reg add "HKLM\Software\Policies\Microsoft\Windows\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Privacy" /v "TailoredExperiencesWithDiagnosticDataEnabled" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKCU\Control Panel\International\User Profile" /v "HttpAcceptLanguageOptOut" /t REG_DWORD /d "1" /f >nul 2>&1
echo.
echo Privacy controls applied.
echo ===============================
pause
goto windows

:io
cls
REM UI responsiveness tweaks
reg add "HKCU\Control Panel\Desktop" /v "MenuShowDelay" /t REG_SZ /d "0" /f >nul 2>&1
reg add "HKCU\Control Panel\Desktop\WindowMetrics" /v "MinAnimate" /t REG_SZ /d "0" /f >nul 2>&1
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "TaskbarAnimations" /t REG_DWORD /d "0" /f >nul 2>&1
echo.
echo UI responsiveness applied.
echo ===============================
pause
goto windows

:plan
cls
echo Opening Windows Power Options.
powercfg.cpl
pause
goto windows

:wsettings
cls
REM Safe Windows/game settings
Reg.exe add "HKLM\SYSTEM\CurrentControlSet\Control\Remote Assistance" /v "fAllowToGetHelp" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\GameDVR" /v AppCaptureEnabled /t REG_DWORD /d 0 /f >nul 2>&1
reg add "HKCU\System\GameConfigStore" /v GameDVR_Enabled /t REG_DWORD /d 0 /f >nul 2>&1
echo System options applied.
echo ===============================
pause
goto windows

:debloat
cls
echo.
echo              ██████╗  █████╗ ██████╗ ██████╗     ██████╗██╗     ███████╗ █████╗ ███╗   ██╗
echo              ██╔══██╗██╔══██╗██╔══██╗██╔══██╗   ██╔════╝██║     ██╔════╝██╔══██╗████╗  ██║
echo              ██████╔╝███████║██████╔╝██████╔╝   ██║     ██║     █████╗  ███████║██╔██╗ ██║
echo              ██╔══██╗██╔══██║██╔══██╗██╔══██╗   ██║     ██║     ██╔══╝  ██╔══██║██║╚██╗██║
echo              ██████╔╝██║  ██║██║  ██║██║  ██║   ╚██████╗███████╗███████╗██║  ██║██║ ╚████║
echo              ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚═════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝
echo           ----------------------------------------------------------------
echo.
echo                      [1] Uninstall Apps (safe list)   [R] Reinstall Apps
echo.
echo                                      [x] Menu
echo.
set /p choice="Choose an option (1, R, x): "
if /i "%choice%"=="r" goto deb_reinstall
if "%choice%"=="1" goto deb_uninstall
if /i "%choice%"=="x" goto main
goto debloat

:deb_uninstall
cls
echo Removing a small set of optional built-in apps (reversible).
powershell -Command "Get-AppxPackage *gamingoverlay* | Remove-AppxPackage" >nul 2>&1
powershell -Command "Get-AppxPackage *xboxapp* | Remove-AppxPackage" >nul 2>&1
powershell -Command "Get-AppxPackage *yourphone* | Remove-AppxPackage" >nul 2>&1
echo Done.
pause
goto debloat

:deb_reinstall
cls
echo Reinstalling removed apps...
powershell -Command "Get-AppxPackage -AllUsers *gamingoverlay* | Foreach {Add-AppxPackage -DisableDevelopmentMode -Register ""$($_.InstallLocation)\AppXManifest.xml""}" >nul 2>&1
powershell -Command "Get-AppxPackage -AllUsers *xboxapp* | Foreach {Add-AppxPackage -DisableDevelopmentMode -Register ""$($_.InstallLocation)\AppXManifest.xml""}" >nul 2>&1
powershell -Command "Get-AppxPackage -AllUsers *yourphone* | Foreach {Add-AppxPackage -DisableDevelopmentMode -Register ""$($_.InstallLocation)\AppXManifest.xml""}" >nul 2>&1
echo Done.
pause
goto debloat

:cpu
cls
REM Safe CPU tweak: disable power throttling
Reg.exe add "HKLM\SYSTEM\CurrentControlSet\Control\Power\PowerThrottling" /v "PowerThrottlingOff" /t REG_DWORD /d "1" /f >nul 2>&1
echo.
echo   CPU Boost Applied
echo ======================
pause
goto main

:clean
@echo off
cls
echo Storage cleanup (SAFE mode).
echo - User temp (files)
echo - Windows temp (files)
echo - Prefetch (files)
echo.
del /s /f /q "%temp%\*.*" >nul 2>&1
del /s /f /q "C:\Windows\Temp\*.*" >nul 2>&1
del /s /f /q "C:\Windows\Prefetch\*.*" >nul 2>&1
ipconfig /flushdns >nul 2>&1
echo.
echo Cleanup complete.
echo ======================
pause
goto main

:misc
cls
echo.
echo                   ███████╗██╗  ██╗████████╗██████╗  █████╗ ███████╗
echo                   ██╔════╝╚██╗██╔╝╚══██╔══╝██╔══██╗██╔══██╗██╔════╝
echo                   █████╗   ╚███╔╝    ██║   ██████╔╝███████║███████╗
echo                   ██╔══╝   ██╔██╗    ██║   ██╔══██╗██╔══██║╚════██║
echo                   ███████╗██╔╝ ██╗   ██║   ██║  ██║██║  ██║███████║
echo                   ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
echo          ------------------------------------------------
echo.
echo              [1] Menu Kill Time (safe)         [x] Menu
echo.
set /p choice="Choose an option (1, x): "
if "%choice%"=="1" goto menuk
if /i "%choice%"=="x" goto main
goto misc

:menuk
Reg.exe add "HKCU\Control Panel\Desktop" /v "AutoEndTasks" /t REG_SZ /d "1" /f >nul 2>&1
Reg.exe add "HKCU\Control Panel\Desktop" /v "HungAppTimeout" /t REG_SZ /d "1000" /f >nul 2>&1
Reg.exe add "HKCU\Control Panel\Desktop" /v "WaitToKillAppTimeout" /t REG_SZ /d "2000" /f >nul 2>&1
Reg.exe add "HKCU\Control Panel\Desktop" /v "LowLevelHooksTimeout" /t REG_SZ /d "1000" /f >nul 2>&1
Reg.exe add "HKCU\Control Panel\Desktop" /v "MenuShowDelay" /t REG_SZ /d "0" /f >nul 2>&1
Reg.exe add "HKLM\SYSTEM\CurrentControlSet\Control" /v "WaitToKillServiceTimeout" /t REG_SZ /d "2000" /f >nul 2>&1
echo  Successfully Applied
echo ======================
pause
goto misc

:dqsize
cls
echo.
echo  INPUT LATENCY (Data Queue Size presets)
echo.
echo   [1] 20     [2] 32     [3] 48     [R] Revert (100)    [x] Menu
echo.
set /p input=: 
if /i "%input%"=="1" goto dq20
if /i "%input%"=="2" goto dq32
if /i "%input%"=="3" goto dq48
if /i "%input%"=="r" goto dqrevert
if /i "%input%"=="x" goto main
goto dqsize

:dq20
Reg.exe add "HKLM\SYSTEM\CurrentControlSet\Services\mouclass\Parameters" /v "MouseDataQueueSize" /t REG_DWORD /d "20" /f >nul 2>&1
Reg.exe add "HKLM\SYSTEM\CurrentControlSet\Services\kbdclass\Parameters" /v "KeyboardDataQueueSize" /t REG_DWORD /d "20" /f >nul 2>&1
goto dqdone

:dq32
Reg.exe add "HKLM\SYSTEM\CurrentControlSet\Services\mouclass\Parameters" /v "MouseDataQueueSize" /t REG_DWORD /d "32" /f >nul 2>&1
Reg.exe add "HKLM\SYSTEM\CurrentControlSet\Services\kbdclass\Parameters" /v "KeyboardDataQueueSize" /t REG_DWORD /d "32" /f >nul 2>&1
goto dqdone

:dq48
Reg.exe add "HKLM\SYSTEM\CurrentControlSet\Services\mouclass\Parameters" /v "MouseDataQueueSize" /t REG_DWORD /d "48" /f >nul 2>&1
Reg.exe add "HKLM\SYSTEM\CurrentControlSet\Services\kbdclass\Parameters" /v "KeyboardDataQueueSize" /t REG_DWORD /d "48" /f >nul 2>&1
goto dqdone

:dqrevert
Reg.exe add "HKLM\SYSTEM\CurrentControlSet\Services\kbdclass\Parameters" /v "KeyboardDataQueueSize" /t REG_DWORD /d "100" /f >nul 2>&1
Reg.exe add "HKLM\SYSTEM\CurrentControlSet\Services\mouclass\Parameters" /v "MouseDataQueueSize" /t REG_DWORD /d "100" /f >nul 2>&1
goto dqdone

:dqdone
echo.
echo Successfully Applied.
pause >nul
goto :main

:discord1
cls
echo Opening Discord server...
echo If your browser blocks it, copy/paste this:
echo https://discord.gg/8afydMZjF9
echo.
cmd /c start "" "https://discord.gg/8afydMZjF9" >nul 2>&1
timeout /t 2 >nul
goto main

:tiktok1
cls
echo Opening TikTok page...
echo If your browser blocks it, copy/paste this:
echo https://www.tiktok.com/@colzys.tweaks
echo.
cmd /c start "" "https://www.tiktok.com/@colzys.tweaks?is_from_webapp=1&sender_device=pc" >nul 2>&1
timeout /t 2 >nul
goto main
