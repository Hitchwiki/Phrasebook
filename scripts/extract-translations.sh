#!/bin/bash

# Script will simply extract locale files from locale.zip to correct folders under /src/
# Use when Glotpress @ http://hitchwiki.org/translate/ is down... ;-)
# Will overwrite any other files.

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
APP_DIR=$SCRIPT_DIR/..

cd "$APP_DIR"

unzip -o ./scripts/locale.zip -d ./src/
mv ./src/locales.js ./src/js/locales.js

echo "Done!"
echo