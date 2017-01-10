package com.mkyong.web.controller.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.mkyong.web.entity.Answer;
import com.mkyong.web.entity.Question;
import com.mkyong.web.entity.Tag;
import com.mkyong.web.entity.User;
import com.mkyong.web.jsonview.Views;
import com.mkyong.web.model.AjaxResponseBody;
import com.mkyong.web.model.AnswerModel;
import com.mkyong.web.model.QuestionModel;
import com.mkyong.web.service.AnswerService;
import com.mkyong.web.service.QuestionService;
import com.mkyong.web.service.TagService;
import com.mkyong.web.service.UserService;
import com.mkyong.web.util.CustomErrorType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
public class AnswerController {
    public static final Logger logger = LoggerFactory.getLogger(QuestionController.class);

    @Autowired
    QuestionService questionService;

    @Autowired
    AnswerService answerService;

    @Autowired
    UserService userService;

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/answers", method = RequestMethod.GET)
    public ResponseEntity<List<Answer>> listAllAnswers() {
        List<Answer> answers = answerService.getAll();
        if (answers.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
            // You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<List<Answer>>(answers, HttpStatus.OK);
    }

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/answer/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getAnswer(@PathVariable("id") long id) {
        logger.info("Fetching Answer with id {}", id);
        Answer answer = answerService.getById(id);
        if (answer == null) {
            logger.error("Answer with id {} not found.", id);
            return new ResponseEntity(new CustomErrorType("Answer with id " + id
                    + " not found"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Answer>(answer, HttpStatus.OK);
    }

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/answer", method = RequestMethod.POST)
    public AjaxResponseBody createQuestion(@RequestBody AnswerModel data, UriComponentsBuilder ucBuilder) {
        logger.info("Creating Answer : {}", data);
        AjaxResponseBody result = new AjaxResponseBody();
        // TODO: 07.01.2017
        // verifyToken();

        String login = "joe";
        User user = userService.getById(6L); //login);

        Question question = questionService.getById(data.getQuestion_id());

        if (Objects.equals(question.getUser().getUsername(), user.getUsername())) {
            user = question.getUser();
        }

        Answer answer = new Answer(data.getMessage(), user, question);
        answer = answerService.addAnswer(answer);

        result.setCode("201");
        result.setMsg(Long.toString(answer.getId()));

        return result;
    }



}
