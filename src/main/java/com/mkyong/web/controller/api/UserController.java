package com.mkyong.web.controller.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.mkyong.web.model.AjaxResponseBody;
import com.mkyong.web.model.AnswerModel;
import com.mkyong.web.model.ChangePasswordModel;
import com.mkyong.web.util.AuthService;
import com.mkyong.web.util.CustomErrorType;
import com.mkyong.web.entity.User;
import com.mkyong.web.jsonview.Views;
import com.mkyong.web.service.UserService;
import com.mkyong.web.util.MD5;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api")
public class UserController {
    public static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Value("${jwt.secret}")
    private String key;

    @Autowired
    UserService userService; //Service which will do all data retrieval/manipulation work

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public ResponseEntity<List<User>> listAllUsers() {
        List<User> users = userService.getAll();
        if (users.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
            // You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    @RequestMapping(value = "/users/name/{name}", method = RequestMethod.GET)
    public ResponseEntity<?> getUserByName(@PathVariable("name") String name) {
        logger.info("Fetching User with name {}", name);
        User user = userService.getByUsername(name);
        if (user == null) {
            logger.error("User with name {} not found.", name);
            return new ResponseEntity(new CustomErrorType("User with name " + name
                    + " not found"), HttpStatus.NOT_FOUND);
        }
        user.setAnswers(null);
        user.setQuestions(null);
        user.setPassword(null);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getUser(@PathVariable("id") long id) {
        logger.info("Fetching User with id {}", id);
        User user = userService.getById(id);
        if (user == null) {
            logger.error("User with id {} not found.", id);
            return new ResponseEntity(new CustomErrorType("User with id " + id
                    + " not found"), HttpStatus.NOT_FOUND);
        }
        user.setAnswers(null);
        user.setQuestions(null);
        user.setPassword(null);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public ResponseEntity<?> createUser(@RequestBody User user, UriComponentsBuilder ucBuilder) {
        logger.info("Creating User : {}", user);

        if (userService.isUserExist(user)) {
            logger.error("Unable to create. A User with name {} already exist", user.getUsername());
            return new ResponseEntity(new CustomErrorType("Unable to create. A User with name " +
                    user.getUsername() + " already exist."),HttpStatus.CONFLICT);
        }
        userService.addUser(user);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/api/user/{id}").buildAndExpand(user.getId()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }





    @RequestMapping(value = "/user/changepassword", method = RequestMethod.POST)
    public AjaxResponseBody createQuestion(@RequestBody ChangePasswordModel data, UriComponentsBuilder ucBuilder) {
        AjaxResponseBody result = new AjaxResponseBody();

        AuthService authService = new AuthService(data.getToken(), key);
        if (authService.getUserName() == null) {
            result.setCode("404");
            result.setMsg(authService.getMessage());
            return result;
        }
        //OK, we can trust this JWT
        String userName = authService.getUserName();

        User user = userService.getByUsername(userName);

        if (!Objects.equals(user.getPassword(), MD5.getHash(data.getOld_password()))) {
            result.setCode("404");
            result.setMsg("wrong old password");
            return result;
        }

        user.setPassword(MD5.getHash(data.getPassword()));

        userService.editUser(user);

        result.setCode("201");
        result.setMsg(Long.toString(user.getId()));

        return result;

    }


    @RequestMapping(value = "/users/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateUser(@PathVariable("id") long id, @RequestBody User user) {
        logger.info("Updating User with id {}", id);

        User currentUser = userService.getById(id);

        if (currentUser == null) {
            logger.error("Unable to update. User with id {} not found.", id);
            return new ResponseEntity(new CustomErrorType("Unable to upate. User with id " + id + " not found."),
                    HttpStatus.NOT_FOUND);
        }

        currentUser.setUsername(user.getUsername());
        currentUser.setPassword(user.getPassword());

        userService.editUser(currentUser);
        return new ResponseEntity<User>(currentUser, HttpStatus.OK);
    }

    @RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteUser(@PathVariable("id") long id) {
        logger.info("Fetching & Deleting User with id {}", id);

        User user = userService.getById(id);
        if (user == null) {
            logger.error("Unable to delete. User with id {} not found.", id);
            return new ResponseEntity(new CustomErrorType("Unable to delete. User with id " + id + " not found."),
                    HttpStatus.NOT_FOUND);
        }
        userService.delete(id);
        return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
    }

//    @RequestMapping(value = "/user/", method = RequestMethod.DELETE)
//    public ResponseEntity<User> deleteAllUsers() {
//        logger.info("Deleting All Users");
//
//        userService.deleteAllUsers();
//        return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
//    }
}
