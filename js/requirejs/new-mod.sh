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
	exit 1
fi

if [ -e $1 ]
then
	echo "[ $1 ] has already exist!"
	exit 1
fi

cp -r ../misc/req-mod-tmpl $1
cd $1

mkdir $1-img

mv req-mod-tmpl.css $1.css
mv req-mod-tmpl.js $1.js

sed -i "s/req-mod-tmpl/$1/" main.js

echo 'mod create ok!'