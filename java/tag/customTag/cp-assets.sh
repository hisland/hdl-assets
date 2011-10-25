echo copy need assets to WebRoot/assets
mkdir -p WebRoot/assets
cp -r ../../../js/src/seed.js WebRoot/assets/
cp -r ../../../js/src/reset WebRoot/assets/
cp -r ../../../js/src/common WebRoot/assets/
cp -r ../../../js/src/condition-list WebRoot/assets/
cp -r ../../../js/src/popWin WebRoot/assets/
echo ok!
exit