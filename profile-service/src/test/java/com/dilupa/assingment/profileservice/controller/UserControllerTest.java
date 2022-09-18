package com.dilupa.assingment.profileservice.controller;

import com.dilupa.assingment.profileservice.config.WebSecurityConfiguration;
import com.dilupa.assingment.profileservice.model.ApiResponse;
import com.dilupa.assingment.profileservice.model.Role;
import com.dilupa.assingment.profileservice.model.User;
import com.dilupa.assingment.profileservice.model.UserResponseData;
import com.dilupa.assingment.profileservice.service.UserServiceImpl;
import com.dilupa.assingment.profileservice.util.ResponseHandlerUtil;
import org.apache.catalina.security.SecurityConfig;
import org.codehaus.jackson.map.ObjectMapper;
import static org.junit.Assert.assertEquals;
import org.junit.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.ws.rs.core.Application;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest
@Import(UserController.class)
@ContextConfiguration(classes={Application.class, WebSecurityConfiguration.class, SecurityConfig.class})
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserServiceImpl userService;

    @Autowired
    private WebApplicationContext context;


    @Before
    void setUp() {
//        mockMvc = MockMvcBuilders
//                .webAppContextSetup(context)
//                .defaultRequest(get("/").with(user("user").roles("ADMIN")))
//                .apply(springSecurity())
//                .build();
    }

    @Test
    @DisplayName("When valid user detail request  then user should get all users")
    @WithMockUser
    void whereValidUserDetailRequest_thenUserShouldGetAllUsers() throws Exception {

        UserResponseData user1 = new UserResponseData();
        user1.setId(1);
        user1.setUsername("testUserName");
        user1.setEmail("test@test.com");
        user1.setRoles(new ArrayList<>());

        UserResponseData user2 = new UserResponseData();
        user2.setId(1);
        user2.setUsername("testUserName");
        user2.setEmail("test@test.com");
        user2.setRoles(new ArrayList<>());


        List<UserResponseData> listOfUsers = new ArrayList<>(Arrays.asList(user1,user2));

        BDDMockito.given(userService.fetchAllProfiles()).willReturn(listOfUsers);

        MvcResult result =  mockMvc.perform(get("/user").with(httpBasic("user","password"))).andReturn();
        assertEquals(200, result.getResponse().getStatus());
    }

    @Test
    @DisplayName("When request  with valid user ID given then should get user data")
    @WithMockUser
    void whereValidUserId_thenShouldGetUser() throws Exception {

        UserResponseData user1 = new UserResponseData();
        user1.setId(1);
        user1.setUsername("testUserName");
        user1.setEmail("test@test.com");
        user1.setRoles(new ArrayList<>());


        List<UserResponseData> listOfUsers = new ArrayList<>(Arrays.asList(user1));

        BDDMockito.given(userService.fetchById(1)).willReturn(listOfUsers);

        MvcResult result =  mockMvc.perform(get("/user?id=1").with(httpBasic("user","password"))).andReturn();
        assertEquals(200, result.getResponse().getStatus());
    }

}