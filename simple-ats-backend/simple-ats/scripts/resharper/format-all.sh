#!/bin/bash
originalPath=$(pwd -P)
baseDir=$(dirname "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)/$(basename "${BASH_SOURCE[0]}")")
cd ${baseDir}/../../../../

RESHARPER=${RESHARPER:-"./.git/hooks/resharper/"}

if [ ! -d "${RESHARPER}" ]; then
    echo "Please, run ./scripts/resharper/setup-resharper.sh to setup resharper"
    exit 1
fi

if [ ! -z $1 ]; then
    INCLUDE_STRING=$1
else
    INCLUDE_STRING="**"
fi
echo "Including: ${INCLUDE_STRING}"

SOLUTION_FILE=$(find . -type f -name "*.sln")

if [ $OSTYPE == "msys" ] || [ $OSTYPE == "cygwin" ] ; then
    ${RESHARPER}/cleanupcode.exe ${RESHARPER_ADDITIONAL_ARGS} \
	--profile="Built-in: Reformat & Apply Syntax Style" \
	"${SOLUTION_FILE}" \
		--exclude="Assets/Plugins/**/*.cs;Assets/Scripts/Data/**_g.cs;Assets/Scripts/Actions/**.cs;Library/PackageCache/**.cs"
else
    ./${RESHARPER}/cleanupcode.sh ${RESHARPER_ADDITIONAL_ARGS} \
        --profile="Built-in: Reformat & Apply Syntax Style" \
        $SOLUTION_FILE \
        --include="${INCLUDE_STRING}" \
        	--exclude="Assets/Plugins/**/*.cs;Assets/Scripts/Data/**_g.cs;Assets/Scripts/Actions/**.cs;Library/PackageCache/**.cs"
fi
