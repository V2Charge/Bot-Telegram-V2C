#!/bin/dash
if [ -e "/home/ubuntu/Projects/telegrambotservice/telegrambotservice.tar" ]; then
    mv telegrambotservice.tar ~
    cd ..
    rm -rf telegrambotservice/
    git clone git@github.com:V2Charge/Bot-Telegram-V2C.git telegrambotservice
    mv ~/telegrambotservice.tar ~/Projects/telegrambotservice
    cd ~/Projects/telegrambotservice
    git pull
    export VERSION_BASE=$(node -p -e "require('./package.json').version")
    export VERSION_RELEASE=$VERSION_BASE-RELEASE
    export POM_ARTIFACT=$(node -p -e "require('./package.json').name")
    microk8s ctr image import telegrambotservice.tar
    export VERSION=$VERSION_RELEASE
    export APP_NAME=$POM_ARTIFACT
    microk8s helm init
    cd charts
    microk8s helm dep build
    sed -i 's/${VERSION}/'"$VERSION"'/g' "values.yaml"
    sed -i 's/${VERSION}/'"$VERSION"'/g' "Chart.yaml"
    export RELEASE_NAME="${APP_NAME}"
    echo "$RELEASE_NAME"
    microk8s helm ls
    export DEPLOYS=$(microk8s helm ls | grep $RELEASE_NAME | wc -l)
    if [ ${DEPLOYS}  -eq 0 ]; then microk8s helm install ${RELEASE_NAME} .; else microk8s helm upgrade --force --recreate-pods ${RELEASE_NAME} . --set-string timestamp=${CURRENT_TIMESTAMP} ; fi
    microk8s helm ls
    rm ~/Projects/telegrambotservice/telegrambotservice.tar
else
    echo "El archivo telegrambotservice.tar no existe. Compilalo en tu máquina para poder hacer el deploy."
fi