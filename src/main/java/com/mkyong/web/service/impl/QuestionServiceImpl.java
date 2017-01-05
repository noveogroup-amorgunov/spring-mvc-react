package com.mkyong.web.service.impl;

import com.mkyong.web.entity.Question;
import com.mkyong.web.entity.User;
import com.mkyong.web.repository.QuestionRepository;
import com.mkyong.web.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Question addQuestion(Question tag) {
        Question savedBank = questionRepository.saveAndFlush(tag);

        return savedBank;
    }

    @Override
    public void delete(long id) {
        questionRepository.delete(id);
    }

    @Override
    public List<Question> getByUser(User user) {
        return questionRepository.findByUser(user.getId());
    }

    @Override
    public Question getById(Long id) {
        return questionRepository.findById(id);
    }

    @Override
    public Question editQuestion(Question user) {
        return questionRepository.saveAndFlush(user);
    }

    @Override
    public List<Question> getAll() {
        return questionRepository.findAll();
    }

}
