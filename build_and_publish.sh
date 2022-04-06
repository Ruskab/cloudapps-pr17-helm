#!/usr/bin/env bash

DOCKERHUB_NAME=codeurjc

# Compile and publish Server
SERVER_IMAGE_NAME="${DOCKERHUB_NAME}/server:v1.0"

printf "\n==> Compile and public Server image with name '%s', using a Dockerfile\n" ${SERVER_IMAGE_NAME}
docker build -t ${SERVER_IMAGE_NAME} ./server
docker push ${SERVER_IMAGE_NAME}

# Compile and publish WeatherService
WEATHERSERVICE_IMAGE_NAME="${DOCKERHUB_NAME}/weatherservice:v1.0"

printf "\n==> Compile and public WeatherService image with name '%s', using BuildPacks\n" ${WEATHERSERVICE_IMAGE_NAME}
pack build ${WEATHERSERVICE_IMAGE_NAME} --path ./weatherservice \
    --builder docker.io/paketobuildpacks/builder:base

docker push ${WEATHERSERVICE_IMAGE_NAME}

# Compile and publish Planner
PLANNER_IMAGE_NAME="${DOCKERHUB_NAME}/planner:v1.0"

printf "\n==> Compile and public Planner image with name '%s', using a Multistage Dockerfile\n" ${PLANNER_IMAGE_NAME}
docker build -t ${PLANNER_IMAGE_NAME} ./planner
docker push ${PLANNER_IMAGE_NAME}

# Compile and publish TopoService
TOPSERVICE_IMAGE_NAME="${DOCKERHUB_NAME}/toposervice:v1.0"

printf "\n==> Compile and public TopoService image with name '%s', using JIB\n" ${TOPSERVICE_IMAGE_NAME}
mvn -f toposervice/ install jib:build -Dimage=${TOPSERVICE_IMAGE_NAME}

exit 0