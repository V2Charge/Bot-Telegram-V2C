#!/bin/dash
if [ "$2" = "1" ]; then
    export VERSION_BASE=$(node -p -e "require('./package.json').version")
    export VERSION_RELEASE=$VERSION_BASE-RELEASE
    export POM_ARTIFACT=$(node -p -e "require('./package.json').name")

    docker build -t v2c/$POM_ARTIFACT:$VERSION_RELEASE .
    docker save v2c/telegrambotservice > telegrambotservice.tar
    docker rmi v2c/$POM_ARTIFACT:$VERSION_RELEASE
fi
scp $1