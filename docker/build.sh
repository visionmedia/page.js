#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CONTAINER_NAME="react-page-router-builder"
IMAGE_NAME="mishadev/react-page-router-builder"
DOCKERFILE="Dockerfile"

docker rm -f $CONTAINER_NAME
docker rmi -f $IMAGE_NAME
echo =============================================================
echo build image $IMAGE_NAME form file $DIR/${DOCKERFILE}
echo =============================================================
docker build -t $IMAGE_NAME --file="$DIR/${DOCKERFILE}" $DIR/../

