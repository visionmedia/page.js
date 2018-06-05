#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CONTAINER_NAME="react-pagejs"
IMAGE_NAME="mishadev/react-pagejs"
DOCKERFILE="Dockerfile"

docker rm -f $CONTAINER_NAME
docker rmi -f $IMAGE_NAME
echo =============================================================
echo build image $IMAGE_NAME form file ./$DOCKERFILE
echo =============================================================
docker build -t $IMAGE_NAME --file="${DOCKERFILE}" .

