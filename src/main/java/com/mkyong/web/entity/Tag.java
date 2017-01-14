package com.mkyong.web.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.mkyong.web.jsonview.Views;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "tag")
public class Tag {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name= "increment", strategy= "increment")
    @Column(name = "id", length = 6, nullable = false)
    @JsonView(Views.Public.class)
    private long id;

    @Column(name = "name", unique=true)
    @JsonView(Views.Public.class)
    private String name;

    @Column(name = "description")
    @JsonView(Views.Public.class)
    private String description;

    @Column(name = "popular")
    @JsonView(Views.Public.class)
    private Integer popular;


    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonView(Views.Public.class)
    private Date created_at;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "tags")
    private Set<Question> questions;

    @PrePersist
    protected void onCreate() {
        created_at = new Date();
    }

    public Tag() {
    }

    public Tag(String name, String description, User user) {
        this.name = name;
        this.description = description;
        this.popular = 1;
        this.user = user;
    }

    public Tag(String name, String description, Integer popular, Date created_at, User user, Set<Question> questions) {
        this.name = name;
        this.description = description;
        this.popular = popular;
        this.created_at = created_at;
        this.user = user;
        this.questions = questions;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPopular() {
        return popular;
    }

    public void setPopular(Integer popular) {
        this.popular = popular;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }
}
