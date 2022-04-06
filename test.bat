@ECHO OFF
@REM GET HOST FROM ARGUMENT
set HOST=%1

@REM GET SERVICES PORTS FROM KUBECTL COMMAND OUTPUT
for /f %%i in ('kubectl get service toposervice-service --output="jsonpath={.spec.ports[0].nodePort}"') do set PORT_TOPO_SERVICE=%%i
for /f %%i in ('kubectl get service server-service --output="jsonpath={.spec.ports[0].nodePort}"') do set PORT_SERVER=%%i

echo IP: %HOST%
echo TOPO SERVICE PORT: %PORT_TOPO_SERVICE%
echo SERVER PORT: %PORT_SERVER%

@REM TEST Topo service by nodePort
curl.exe --max-time 5 -Isf  "http://%HOST%:%PORT_TOPO_SERVICE%/api/topographicdetails/Madrid" | findstr /IR "200 301">nul
IF %ERRORLEVEL% EQU 0 (
    ECHO http://%HOST%:%PORT_TOPO_SERVICE%/api/topographicdetails/Madrid [OK]
) ELSE (
    ECHO http://%HOST%:%PORT_TOPO_SERVICE%/api/topographicdetails/Madrid [FAIL]
)

@REM TEST ServiceB External Ingress
curl.exe --max-time 1 -Isf "http://%HOST%:%PORT_SERVER%" | findstr /IR "200 301">nul
IF %ERRORLEVEL% EQU 0 (
    ECHO http://%HOST%:%PORT_SERVER% [OK]
) ELSE (
    ECHO http://%HOST%:%PORT_SERVER% [FAIL]
)


