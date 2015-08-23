#!/bin/bash

#if exist, clean it
if [ -d ../docs-validator ]
then
	echo 'clean prev docs...'
	rm -r ../docs-validator/*
fi

CONF="$PWD/validator.doc.js"

#use kissy-tools's templates to make docs
cd ../../../kissy-tools/jsdoc/
echo 'make docs...'
java -jar jsrun.jar app/run.js -c=$CONF
