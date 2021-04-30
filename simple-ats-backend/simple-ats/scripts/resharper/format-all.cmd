@echo off

IF "%GIT_HOME%"=="" (
	ECHO "Enviroment variable GIT_HOME not defined"
	pause
	exit
)

echo "Running SH on %cd%"

CALL "%GIT_HOME%/bin/sh" -c "./scripts/resharper/format-all.sh" --login
exit