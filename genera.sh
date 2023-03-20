#!/bin/dash
#cd ..
#rm -rf v2c_dashboard-main/
#cd ~/Projects/v2c_dashboard-main
git pull origin master
export VERSION_BASE=$(node -p -e "require('./package.json').version")
export VERSION_RELEASE=$VERSION_BASE-RELEASE
export POM_ARTIFACT=$(node -p -e "require('./package.json').name")
docker build --no-cache -t v2c/$POM_ARTIFACT:$VERSION_RELEASE .
docker save v2c/telegrambotservice > telegrambotservice.tar
microk8s ctr image import telegrambotservice.tar
export VERSION=$VERSION_RELEASE
export APP_NAME=$POM_ARTIFACT
#microk8s helm3 init
cd charts
microk8s helm3 dep build
sed -i 's/${VERSION}/'"$VERSION"'/g' "values.yaml"
sed -i 's/${VERSION}/'"$VERSION"'/g' "Chart.yaml"
export RELEASE_NAME="${APP_NAME}"
echo "$RELEASE_NAME"
microk8s helm3 ls
export DEPLOYS=$(microk8s helm3 ls | grep $RELEASE_NAME | wc -l)
if [ ${DEPLOYS}  -eq 0 ]; then microk8s helm3 install ${RELEASE_NAME} .; else microk8s helm3 upgrade ${RELEASE_NAME} . --set-string timestamp=${CURRENT_TIMESTAMP} ; fi
microk8s helm3 ls


