#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "${DIR}"
set -e

BASE_TAG="jedrzejlewandowski/extensa-chart"
VERSION="2.1.2"

git tag "v${VERSION}"
git push origin "v${VERSION}"

docker build -t "${BASE_TAG}" .
docker tag "${BASE_TAG}" "${BASE_TAG}:latest"
docker tag "${BASE_TAG}" "${BASE_TAG}:${VERSION}"
docker push "${BASE_TAG}:latest"
docker push "${BASE_TAG}:${VERSION}"
