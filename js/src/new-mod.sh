#!/bin/bash

function useage(){
	echo '-------------------------------------------------'
	echo 'useage: ./new-mod.sh modName'
	echo 'modName must specify and can not be an exist one!'
	echo '-------------------------------------------------'
	echo 
}
if [ -z $1 ]
then
	useage
	echo 'please enter a mod name!'
	exit 1
fi

if [ -e $1 ]
then
	useage
	echo "[ $1 ] has already exist!"
	exit 1
fi

cp -r ../misc/mod-template $1
cd $1

mkdir misc $1-img

sed "s/mod-template/$1/" build.properties > tmp
mv tmp build.properties

sed "s/mod-template/$1/" build.xml > tmp
mv tmp build.xml

sed "s/mod-template/$1/" mod-template.js > tmp
mv tmp mod-template.js

sed "s/mod-template/$1/" demo.html > tmp
mv tmp demo.html

sed "s/mod-template/$1/" view.html > tmp
mv tmp view.html

mv mod-template.css $1.css
mv mod-template.js $1.js

echo 'mod create ok!'