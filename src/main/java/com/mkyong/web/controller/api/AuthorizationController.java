package com.mkyong.web.controller.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.mkyong.web.entity.User;
import com.mkyong.web.jsonview.Views;
import com.mkyong.web.model.LoginModel;
import com.mkyong.web.model.LoginResponseBody;
import com.mkyong.web.model.SearchCriteria;
import com.mkyong.web.service.UserService;
import com.mkyong.web.util.CustomErrorType;
import com.mkyong.web.util.MD5;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api")
public class AuthorizationController {
    public static final Logger logger = LoggerFactory.getLogger(QuestionController.class);

    @Value("${jwt.secret}")
    private String key;

    @Autowired
    UserService userService; //Service which will do all data retrieval/manipulation work

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody LoginModel data) {
        User user = userService.getByUsername(data.getUsername());

        if (user == null) {
            return new ResponseEntity(new LoginResponseBody(false, null, "User with that name isn't exist"),
                    HttpStatus.OK);
        }

        if (!Objects.equals(user.getPassword(), MD5.getHash(data.getPassword()))) {
            return new ResponseEntity(new LoginResponseBody(false, null, "wrong_password"),
                    HttpStatus.OK);
        }

        String token = Jwts.builder()
                .setSubject(data.getUsername())
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();

        return new ResponseEntity(new LoginResponseBody(true, token), HttpStatus.OK);
    }

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> register(@RequestBody LoginModel data) {

        User user = userService.getByUsername(data.getUsername());

        if (user != null) {
            return new ResponseEntity(new LoginResponseBody(false, null, "User with that name has already existed"),
                    HttpStatus.OK);
        }

        User newUser = new User(data.getUsername(), MD5.getHash(data.getPassword()), new Date(), "active", 0);
        userService.addUser(newUser);

        String token = Jwts.builder()
                .setSubject(newUser.getUsername())
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();

        return new ResponseEntity(new LoginResponseBody(true, token), HttpStatus.OK);
    }

/*    @JsonView(Views.Public.class)
    @RequestMapping(value = "/question/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getQuestion(@PathVariable("id") long id) {
        logger.info("Fetching Question with id {}", id);
        Question question = questionService.getById(id);
        if (question == null) {
            logger.error("Question with id {} not found.", id);
            return new ResponseEntity(new CustomErrorType("Question with id " + id
                    + " not found"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Question>(question, HttpStatus.OK);
    }*/
}