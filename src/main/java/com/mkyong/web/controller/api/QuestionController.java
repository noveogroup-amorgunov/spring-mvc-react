package com.mkyong.web.controller.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.mkyong.util.CustomErrorType;
import com.mkyong.web.entity.Question;
import com.mkyong.web.jsonview.Views;
import com.mkyong.web.service.QuestionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/api")
public class QuestionController {
    public static final Logger logger = LoggerFactory.getLogger(QuestionController.class);

    @Autowired
    QuestionService questionService; //Service which will do all data retrieval/manipulation work

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/questions", method = RequestMethod.GET)
    public ResponseEntity<List<Question>> listAllQuestions() {
        List<Question> questions = questionService.getAll();
        if (questions.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
            // You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<List<Question>>(questions, HttpStatus.OK);
    }

    @JsonView(Views.Public.class)
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
    }
}