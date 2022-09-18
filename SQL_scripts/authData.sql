INSERT INTO oauth_client_details (client_id, client_secret, web_server_redirect_uri, scope, access_token_validity, refresh_token_validity, resource_ids, authorized_grant_types, additional_information) VALUES ('mobile', '{bcrypt}$2a$10$gPhlXZfms0EpNHX0.HHptOhoFD1AoxSr/yUIdTqA8vtjeP4zi0DDu', 'http://localhost:8080/code', 'READ,WRITE', '3600', '10000', 'inventory,payment', 'authorization_code,password,refresh_token,implicit', '{}');

 INSERT INTO PERMISSION (NAME) VALUES
 ('create_profile'),
 ('read_profile'),
 ('update_profile'),
 ('delete_profile');

 INSERT INTO role (NAME) VALUES
		('ROLE_ALLOW_EDIT'),('ROLE_user');

 INSERT INTO PERMISSION_ROLE (PERMISSION_ID, ROLE_ID) VALUES
     (1,1), /*create-> ROLE_ALLOW_EDIT */
     (2,1), /* read ROLE_ALLOW_EDIT */
     (3,1), /* update ROLE_ALLOW_EDIT */
     (4,1), /* delete ROLE_ALLOW_EDIT */
     (2,2);  /* read permission to ROLE_user*/


insert into user (id, username,password, email, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked) VALUES ('1', 'adminuser','{bcrypt}$2a$10$ODGwrk2ufy5d7T6afmACwOA/6j6rvXiP5amAMt1YjOQSdEw44QdqG', 'admin@admin.com', '1', '1', '1', '1');
/*
 passowrds:
 adminuser - kpass  (For this user ROLE_ALLOW_EDIT = TRUE)
*/


INSERT INTO ROLE_USER (ROLE_ID, USER_ID)
    VALUES
    (1, 1) /* adminuser*/