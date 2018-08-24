#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CONTAINER_NAME="react-pagejs"
IMAGE_NAME="mishadev/react-pagejs"
BUILDER_OUTPUT_DIR_PATH="./dist"

echo =============================================================
echo run image $IMAGE_NAME container name $CONTAINER_NAME
echo =============================================================
  mkdir $BUILDER_OUTPUT_DIR_PATH
  OUTPUT="$( cd "$BUILDER_OUTPUT_DIR_PATH" && pwd )"
  echo =============================================================
  echo output $OUTPUT
  echo =============================================================

  docker run -it \
    -v "$OUTPUT:/app/dist" \
    --name $CONTAINER_NAME \
    $IMAGE_NAME

