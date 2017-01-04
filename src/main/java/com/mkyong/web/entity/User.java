package com.mkyong.web.entity;

import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name= "increment", strategy= "increment")
    @Column(name = "id", length = 6, nullable = false)
    private long id;

    @Column(name = "username", length = 64, unique=true)
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date created_at;

    @Column(name = "status")
    private String status;

    @Column(name = "popular")
    private Integer popular;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
    private Set<Question> questions;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
    private Set<Answer> answers;

    public User() {
    }

    public User(String username, String password, Date created_at, String status, Integer popular) {
        this.username = username;
        this.password = password;
        this.created_at = created_at;
        this.status = status;
        this.popular = popular;
    }

    public User(String username, String password, Date created_at, String status, Integer popular, Set<Question> questions, Set<Answer> answers) {
        this.username = username;
        this.password = password;
        this.created_at = created_at;
        this.status = status;
        this.popular = popular;
        this.questions = questions;
        this.answers = answers;
    }

    public Set<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(Set<Answer> answers) {
        this.answers = answers;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getPopular() {
        return popular;
    }

    public void setPopular(Integer popular) {
        this.popular = popular;
    }

    public Set<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }
}
