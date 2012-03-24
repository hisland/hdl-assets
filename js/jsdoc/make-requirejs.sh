#!/bin/bash

#if exist, clean it
if [ -d ../docs-requirejs ]
then
	echo 'clean prev docs...'
	rm -r ../docs-requirejs/*
fi

CONF="$PWD/requirejs.doc.js"

#use kissy-tools's templates to make docs
cd ../../../kissy-tools/jsdoc/
echo 'make docs...'
java -jar jsrun.jar app/run.js -c=$CONF
