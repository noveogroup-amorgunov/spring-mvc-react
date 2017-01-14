package com.mkyong.web.controller.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.mkyong.web.entity.*;
import com.mkyong.web.entity.enums.VoteMark;
import com.mkyong.web.jsonview.Views;
import com.mkyong.web.model.AjaxResponseBody;
import com.mkyong.web.model.AnswerModel;
import com.mkyong.web.model.QuestionModel;
import com.mkyong.web.model.VoteModel;
import com.mkyong.web.service.*;
import com.mkyong.web.service.UserService;
import com.mkyong.web.service.impl.VoteServiceImpl;
import com.mkyong.web.util.*;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class VoteController {
    public static final Logger logger = LoggerFactory.getLogger(QuestionController.class);

    @Value("${jwt.secret}")
    private String key;

    @Autowired
    QuestionService questionService;

    @Autowired
    AnswerService answerService;

    @Autowired
    UserService userService;

    @Autowired
    VoteService voteService;

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/vote", method = RequestMethod.POST)
    public AjaxResponseBody createQuestion(@RequestBody VoteModel data, UriComponentsBuilder ucBuilder) {
        logger.info("Creating Vote : {}", data);
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
        Question question = questionService.getById(data.getQuestion_id());
        Answer answer = answerService.getById(data.getAnswer_id());

        VoteMark mark = VoteMark.DOWN;
        if (Objects.equals(data.getMark(), "UP")) {
            mark = VoteMark.UP;
        }

        User author = user;

        if (question != null) {
            if (Objects.equals(user.getUsername(), question.getUser().getUsername())) {
                user = question.getUser();
            }

            author = question.getUser();
            if (mark == VoteMark.DOWN) {
                author.setPopular(author.getPopular() - 2);
            } else {
                author.setPopular(author.getPopular() + 5);
            }

        } else if (answer != null) {
            if (Objects.equals(user.getUsername(), answer.getQuestion().getUser().getUsername())) {
                user = answer.getQuestion().getUser();
            }

            author = answer.getUser();
            if (mark == VoteMark.DOWN) {
                author.setPopular(author.getPopular() - 2);
            } else {
                author.setPopular(author.getPopular() + 10);
            }
        }

        if (author != user) {
            userService.editUser(author);
        }

        Vote vote = new Vote(null, question, answer, user, mark);
        vote = voteService.addVote(vote);

        result.setCode("201");
        result.setMsg(Long.toString(vote.getId()));

        return result;
    }



}
