package com.mkyong.web.controller.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.mkyong.web.entity.User;
import com.mkyong.web.jsonview.Views;
import com.mkyong.web.model.LoginModel;
import com.mkyong.web.model.LoginResponseBody;
import com.mkyong.web.model.SearchCriteria;
import com.mkyong.web.service.UserService;
import com.mkyong.web.util.CustomErrorType;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Key;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AuthorizationController {
    public static final Logger logger = LoggerFactory.getLogger(QuestionController.class);

    @Autowired
    UserService userService; //Service which will do all data retrieval/manipulation work

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody LoginModel data) {

        // Key key = MacProvider.generateKey();
        String key = "secret-key";

        String token = Jwts.builder()
                .setSubject("Joe")
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();

        User user = userService.getByUsername(data.getUsername());

        // This user already exist

        if (user == null) {
            return new ResponseEntity(new CustomErrorType("User with that name isn't exist"),
                    HttpStatus.NOT_FOUND);
            // You many decide to return HttpStatus.NOT_FOUND
        }
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