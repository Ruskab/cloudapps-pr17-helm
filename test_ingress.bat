@ECHO OFF

@REM TEST server via ingress
curl.exe --max-time 1 -Isf  "http://cluster-ip/" | findstr /IR "200 301" >nul
IF %ERRORLEVEL% EQU 0 (
    ECHO "server cluster-ip/ via ingress [OK]"
) ELSE (
    ECHO "server cluster-ip/ via ingress [FAIL]"
)

@REM TEST toposervice endpoint
curl.exe --max-time 5 -Isf "http://cluster-ip/toposervice/api/topographicdetails/Madrid" | findstr /IR "200 301" >nul
IF %ERRORLEVEL% EQU 0 (
    ECHO "toposervice cluster-ip/toposervice/api/topographicdetails/Madrid [OK]"
) ELSE (
    ECHO "toposervice cluster-ip/toposervice/api/topographicdetails/Madrid [FAIL]"
)
