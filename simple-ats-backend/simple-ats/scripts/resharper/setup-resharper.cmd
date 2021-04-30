@echo off

IF "%GIT_HOME%"=="" (
	ECHO "Enviroment variable GIT_HOME not defined"
	pause
	exit
)

start "" "%GIT_HOME%/bin/sh" -c "./setup-resharper.sh" --login