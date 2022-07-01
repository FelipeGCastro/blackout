#!/bin/bash

set -eo pipefail

HOST_OS=$(uname -s)

if [[ ${HOST_OS} == 'Darwin' ]] ; then

    # MacOS needs to have -i followed by '' as the extension for it to work correctly.
    sed -i '' -E "s/(\"main\":).*/\1 \"dist\/index.js\",/" package.json

elif [[ ${HOST_OS} == 'Linux' ]] ; then
    echo "here then..."
    # Linux does not need to have the extension following the -i option as MacOS does.
    sed -i -E "s/(\"main\":).*/\1 \"dist\/index.js\",/" package.json
fi