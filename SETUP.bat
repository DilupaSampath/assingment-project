@echo off
echo *****************************************************************************
echo **********This will create below tables and updated CITY table data**********
echo *****************************************************************************
echo  Note: **** Before run this make sure to start micro services ****
echo  oauth_client_details
echo  permission
echo  role
echo  user
echo  city
echo  permission_role
echo  role_user
echo  oauth_client_token
echo  oauth_access_token
echo  oauth_refresh_token
echo  oauth_code
echo  oauth_approvals
echo *****************************************************************************
echo
set /p user="DB user name : "
call cd SQL_scripts
mysql --host=localhost --user=%user% --password --database=assingmentDB < schema.sql && (
  Echo *****************************************************************************
  Echo **************************Table creation success*****************************
  Echo *****************************************************************************
) || (
  Echo Error when creating tables.......!!!!!!!!
  Echo Error when creating tables.......!!!!!!!!
)

set /p dataInsertStatus="Do you want to insert data into CITY table? y/n : "

If "%dataInsertStatus%" == "y" (mysql --host=localhost --user=%user% --password --database=assingmentDBCity < cityData.sql && (
  Echo *****************************************************************************
  Echo **************************City data updated*****************************
  Echo *****************************************************************************
  Echo All completed..!
) || (
  Echo Error when inserting data.......!!!!!!!!
  Echo Error when inserting data.......!!!!!!!!
  Echo Error when inserting data.......!!!!!!!!
  Echo Error when inserting data.......!!!!!!!!
)) else (Echo ***************************Skipped..!**************************************************)

set /p authDataInsertStatus="Do you want to insert data into OAuth tables? y/n : "

If "%authDataInsertStatus%" == "y" (mysql --host=localhost --user=%user% --password --database=assingmentDB < authData.sql && (
  Echo *****************************************************************************
  Echo **************************OATH data tables updated*****************************
  Echo *****************************************************************************
  Echo All completed..!
) || (
  Echo Error when inserting OATH data.......!!!!!!!!
  Echo Error when inserting OATH data.......!!!!!!!!
  Echo Error when inserting OATH data.......!!!!!!!!
  Echo Error when inserting OATH data.......!!!!!!!!
)) else (Echo ***************************All completed..!**************************************************)

pause