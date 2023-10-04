ECHO OFF
CLS

:MENU
ECHO.
ECHO ...............................................
ECHO PRESS 1, 2 OR 3 to select your task, or q to EXIT.
ECHO ...............................................
ECHO.
ECHO 1 - Docker Build and Run WebApp. (Local)
ECHO 2 - Docker Build and Run WebApi (Local)
ECHO 3 - Docker XBuild and publish WebApp. for linux/amd64,linux/arm64
ECHO 4 - Docker XBuild and publish WebApi for linux/amd64,linux/arm64
ECHO 5 - Run Docker Compose
ECHO 6 - Show running containers (Local)
ECHO 7 - Delete running container (Local)
ECHO 8 - Show downloaded images (Local)
ECHO 9 - Prune images (Local)
ECHO q - EXIT
ECHO.

SET /P M=Type 1, 2, 3, or 4 then press ENTER:
IF %M%==1 GOTO STARTWEBAPPLOCAL
IF %M%==2 GOTO STARTWEBAPILOCAL
IF %M%==3 GOTO XBUILDWEBAPP
IF %M%==4 GOTO XBUILDWEBAPI
IF %M%==5 GOTO DOCKERCOMPOSE
IF %M%==6 GOTO SHOWCONTAINERS
IF %M%==7 GOTO DELETECONTAINER
IF %M%==8 GOTO SHOWIMAGES
IF %M%==9 GOTO PRUNEIMAGES
IF %M%==q GOTO EOF


:STARTWEBAPPLOCAL
docker build -t starfield-planner-webapplication KrakenSoftware.Starfield.Planner.WebApplication
docker run -dp 35000:80 starfield-planner-webapplication
docker ps
ECHO.
ECHO.
ECHO WebApplication running at http://localhost:35000/
ECHO.
GOTO MENU

:STARTWEBAPILOCAL
docker build -t starfield-planner-webapi KrakenSoftware.Starfield.Planner..WebApi
docker run -dp 36000:80 starfield-planner-webapi
docker ps
ECHO.
ECHO.
ECHO WebApi running at http://localhost:36000/swagger
ECHO.
GOTO MENU

:XBUILDWEBAPP
docker buildx build -t ltkraken/krakensoftware:starfield-planner --platform linux/amd64,linux/arm64 KrakenSoftware.Starfield.Planner.WebApplication --push
docker images
docker image prune -f
GOTO MENU

:XBUILDWEBAPI
docker buildx build -t ltkraken/krakensoftware:starfield-planner-webapi --platform linux/amd64,linux/arm64 . --push
docker images
docker image prune -f
GOTO MENU

:DOCKERCOMPOSE
docker compose up

:SHOWCONTAINERS
docker ps
GOTO MENU

:DELETECONTAINER
docker ps
set /p choice=Enter Image ID: 
docker kill %choice%
docker rm %choice%
GOTO MENU

:SHOWIMAGES
docker images
GOTO MENU

:PRUNEIMAGES
docker image prune -f
GOTO MENU

pause