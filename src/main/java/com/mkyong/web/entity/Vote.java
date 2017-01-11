package com.mkyong.web.entity;


import com.fasterxml.jackson.annotation.JsonView;
import com.mkyong.web.entity.enums.VoteMark;
import com.mkyong.web.entity.enums.VoteModule;
import com.mkyong.web.jsonview.Views;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "vote")
public class Vote {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    @Column(name = "id", length = 6, nullable = false)
    @JsonView(Views.Public.class)
    private long id;

    @Column(name = "module_id")
    @Enumerated(EnumType.STRING)
    @JsonView(Views.Public.class)
    private VoteModule module;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "question_id", nullable = true)
    private Question question;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "answer_id", nullable = true)
    private Answer answer;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "user_id", nullable = false)
    @JsonView(Views.Public.class)
    private User user;

    @Column(name = "mark")
    @Enumerated(EnumType.STRING)
    @JsonView(Views.Public.class)
    private VoteMark mark;

    public Vote(VoteModule module, Question question, Answer answer, User user, VoteMark mark) {
        this.module = module;
        this.question = question;
        this.answer = answer;
        this.user = user;
        this.mark = mark;
    }

    public VoteMark getMark() {
        return mark;
    }

    public void setMark(VoteMark mark) {
        this.mark = mark;
    }

    public Vote() {
    }

    public Vote(VoteModule module, Question question, Answer answer, User user) {
        this.module = module;
        this.question = question;
        this.answer = answer;
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public VoteModule getModule() {
        return module;
    }

    public void setModule(VoteModule module) {
        this.module = module;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Answer getAnswer() {
        return answer;
    }

    public void setAnswer(Answer answer) {
        this.answer = answer;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
