package com.mkyong.web.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.mkyong.web.jsonview.Views;
import com.mkyong.web.util.TimeAgo;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "question")
public class Question {
    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name= "increment", strategy= "increment")
    @Column(name = "id", length = 6, nullable = false)
    @JsonView(Views.Public.class)
    private long id;

    @Column(name = "title", length = 255)
    @JsonView(Views.Public.class)
    private String title;

    //@JsonView(Views.Public.class)
    private String ago;

    public String getAgo() {
        return TimeAgo.get(created_at.toString());
    }

    public void setAgo(String ago) {
        this.ago = ago;
    }

    public Set<Vote> getVotes() {
        return votes;
    }

    public void setVotes(Set<Vote> votes) {
        this.votes = votes;
    }

    @Column(name = "comment", columnDefinition="TEXT")
    @Type(type = "text")
    @JsonView(Views.Public.class)
    private String comment;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "user_id", nullable = false)
    @JsonView(Views.Public.class)
    private User user;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "question")
    @JsonView(Views.Public.class)
    @OrderBy("id DESC")
    private Set<Answer> answers;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonView(Views.Public.class)
    private Date created_at;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonView(Views.Public.class)
    private Date updated_at;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name="question_tag",
            joinColumns = @JoinColumn(name="question_id", referencedColumnName="id"),
            inverseJoinColumns = @JoinColumn(name="tag_id", referencedColumnName="id")
    )
    @JsonView(Views.Public.class)
    private Set<Tag> tags;


    @OneToMany(fetch = FetchType.EAGER, mappedBy = "question")
    @JsonView(Views.Public.class)
    private Set<Vote> votes;


    @PrePersist
    protected void onCreate() {
        created_at = new Date();
        updated_at = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        updated_at = new Date();
    }

    public Question() {
    }

    public Question(String title, String comment, User user, Set<Tag> tags) {
        this.title = title;
        this.comment = comment;
        this.user = user;

        this.tags = tags;
    }

    public Question(String title, String comment, User user, Set<Answer> answers, Date created_at, Date updated_at, Set<Tag> tags) {
        this.title = title;
        this.comment = comment;
        this.user = user;
        this.answers = answers;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.tags = tags;
    }

    public Set<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(Set<Answer> answers) {
        this.answers = answers;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public Question(String title, String comment, User user, Date created_at, Date updated_at) {
        this.title = title;
        this.comment = comment;
        this.user = user;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    public Question(String title, String comment, User user) {
        this.title = title;
        this.comment = comment;
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public Date getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(Date updated_at) {
        this.updated_at = updated_at;
    }
}
