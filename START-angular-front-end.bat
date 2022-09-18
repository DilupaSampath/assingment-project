@echo off
call cd city-list-project
call npm i
call node node_modules/@angular/cli/bin/ng version
echo please wait...
call node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng serve --proxy-config=proxy/local.conf.json

pause