#!/bin/bash
set -ex

API_URL="${1:-http://localhost:3500}"
VUE_APP_API_URL="$API_URL" VUE_APP_PUBLIC_PATH="$npm_package_name" \
  vue-cli-service build --dest build
