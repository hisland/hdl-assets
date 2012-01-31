#!/bin/bash

#if exist, clean it
if [ -d ../docs ]
then
	echo 'clean prev docs...'
	rm -r ../docs/*
fi

CONF="$PWD/jsdoc.conf"

#use kissy-tools's templates to make docs
cd ../../../kissy-tools/jsdoc/
echo 'make docs...'
java -jar jsrun.jar app/run.js -c=$CONF
