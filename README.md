#City List Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.

## Development server

Run `npm start` for a dev server. This will linked with local proxy file. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
or double click on the *root folder\START-angular-front-end.bat 
(Note: Do not use the ng serve command. Since an internal proxy file is used, a customized ng serve command is run when the following bat file is double clicked)
## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test` to execute the unit tests via [JEST](https://jestjs.io/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
##Features
**User login

**User registration - All users are automatically registered under ROLE_ALLOW_EDIT = False. User roles can be updated by the admin.

**After encoding the logged in user session data,  it is stored in session storage .

**Cities are loaded with server side pagination.

**Cities can be filtered by name with server side pagination.

**Tables are implemented with Angular animation.

**View city data.

**Indication to identify 404 images.

**Update city name and image.

**City image URL validation.

**City name validation.

**View users details.

**Indication to identify the current user from the user table.

**Admin can update user roles. Other users don’t have permission to access this route.

**Log out option - After logging out all cached session storage data will be removed.


####authorization-server - Spring boot OAuth server
####gateway - Spring cloud gateway
####discovery-service - Eureka discovery service
####profile-service - User microservice
####city-service - City microservice
####SQL_scripts - SQL scripts to run the setup.
####city-list-project - city-list Angular Frontend

##To run the project
(Minimum Node js version - 14.15, Minimum java 11 version, DB -MySQL)
####1.Clone the git repo and navigate to the root folder.

####2.Update the database connection string in every spring boot application.
*authorization-server application.yml (root folder\authorization-server\src\main\resources\application.yml).

*profile-service application.yml (root folder\profile-service\src\main\resources\application.yml).

*city-service application.yml (root folder\city-service\src\main\resources\application.yml)

####3.Double click on these bat files to run microservices.
*root folder\START-authorization-server.bat

*root folder\START-city-service.bat

*root folder\START-discovery-service.bat

*root folder\START-gateway.bat

*root folder\START-profile-service.bat

####4.Run this SETUP bat file. (Note: All spring boot applications need to be up and running to perform this.)
*root folder\SETUP.bat

####5.Enter following data to command line

*DB username and password

*Upload the city data list - y

*Insert data to OAuth tables - y
#####Setup is completed...!

####6.Run the angular server. (Note: Do not use the ng serve command. Since an internal proxy file is used, a customized ng serve command is run when the following bat file is double clicked.)
*root folder\START-angular-front-end.bat
##All done……!

####7.Now open your browser and navigate to http://localhost:4200/

Admin user login details with ROLE_ALLOW_EDIT = True
Username - adminuser
Password - kpass
