call cd gateway
TITLE gateway-service

call mvn clean install

call mvn spring-boot:run