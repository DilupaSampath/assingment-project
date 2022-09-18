call cd city-list-project

IF NOT EXIST node_modules npm i
call node node_modules/@angular/cli/bin/ng version
call node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng serve --proxy-config=proxy/local.conf.json

pause