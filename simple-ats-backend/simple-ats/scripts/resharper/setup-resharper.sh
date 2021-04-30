#!/usr/bin/env bash
originalPath=$(pwd -P)
baseDir=$(dirname "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)/$(basename "${BASH_SOURCE[0]}")")
cd ${baseDir}/../../../../

VERSION=2020.3.1
FILE_NAME=JetBrains.ReSharper.CommandLineTools.${VERSION}.zip
CACHE_FILE="/tmp/${FILE_NAME}"
TARGET_FILE="./${FILE_NAME}"

GIT_RESHARPER_FOLDER="./.git/hooks/resharper"

if [ ! -f ${CACHE_FILE} ]; then
    echo "Downloading ${FILE_NAME}"
    curl https://download-cf.jetbrains.com/resharper/dotUltimate.2020.3.1/${FILE_NAME} -o ${TARGET_FILE}
else
    echo "Copying ${FILE_NAME} from /tmp"
    cp ${CACHE_FILE} ${TARGET_FILE}
fi

echo "Setting up resharper version ${VERSION}"
rm -rf ${GIT_RESHARPER_FOLDER}
mkdir -p ${GIT_RESHARPER_FOLDER}
unzip -q ${TARGET_FILE} -d ${GIT_RESHARPER_FOLDER}
rm ${TARGET_FILE}
