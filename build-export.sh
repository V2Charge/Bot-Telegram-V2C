#!/bin/sh
set -e

VERSION=$(node -p "require('./package.json').version")
NAME=$(node -p "require('./package.json').name")
IMAGE="${NAME}:${VERSION}"
OUTPUT="${NAME}-${VERSION}.tar.gz"

echo "Building ${IMAGE}..."
docker build -t "${IMAGE}" -t "${NAME}:latest" .

echo "Exporting to ${OUTPUT}..."
docker save "${IMAGE}" "${NAME}:latest" | gzip > "${OUTPUT}"

echo "Removing local images..."
docker rmi "${IMAGE}" "${NAME}:latest"

echo "Done: ${OUTPUT}"
