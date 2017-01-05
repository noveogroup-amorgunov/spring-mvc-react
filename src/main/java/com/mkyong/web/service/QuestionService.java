package com.mkyong.web.service;

import com.mkyong.web.entity.Question;
import com.mkyong.web.entity.User;
import java.util.List;

public interface QuestionService {
    Question addQuestion(Question user);
    void delete(long id);
    List<Question> getByUser(User user);
    Question getById(Long id);
    Question editQuestion(Question user);
    List<Question> getAll();
}