package com.mkyong.web.controller.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.mkyong.web.entity.Tag;
import com.mkyong.web.jsonview.Views;
import com.mkyong.web.service.TagService;
import com.mkyong.web.util.CustomErrorType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TagController {
    public static final Logger logger = LoggerFactory.getLogger(QuestionController.class);

    @Autowired
    TagService tagService; //Service which will do all data retrieval/manipulation work

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/tags", method = RequestMethod.GET)
    public ResponseEntity<List<Tag>> listAllQuestions() {
        List<Tag> tags = tagService.getAll();
        if (tags.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
            // You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<List<Tag>>(tags, HttpStatus.OK);
    }

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/tag/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getQuestion(@PathVariable("id") long id) {
        logger.info("Fetching Tag with id {}", id);
        Tag tag = tagService.getById(id);
        if (tag == null) {
            logger.error("Question with id {} not found.", id);
            return new ResponseEntity(new CustomErrorType("Tag with id " + id
                    + " not found"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Tag>(tag, HttpStatus.OK);
    }

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/tags/{q}", method = RequestMethod.POST)
    public ResponseEntity<List<Tag>> getTagsByTerm(@PathVariable("q") String q) {
        logger.info("Fetching Tags with search term {}", q);
        List<Tag> tags = tagService.getByCharacters(q);
        return new ResponseEntity<List<Tag>>(tags, HttpStatus.OK);
    }
}