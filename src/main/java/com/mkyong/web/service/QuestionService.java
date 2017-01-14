package com.mkyong.web.service;

import com.mkyong.web.entity.Question;
import com.mkyong.web.entity.Tag;
import com.mkyong.web.entity.User;
import java.util.List;

public interface QuestionService {
    Question addQuestion(Question question);
    void delete(long id);
    List<Question> getByUser(User user);
    List<Question> getByTag(Tag tag);
    Question getById(Long id);
    Question editQuestion(Question question);
    List<Question> getAll();
}