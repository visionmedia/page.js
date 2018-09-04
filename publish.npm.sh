#!/bin/bash

./docker/build.sh
./docker/run.sh

npm publish
