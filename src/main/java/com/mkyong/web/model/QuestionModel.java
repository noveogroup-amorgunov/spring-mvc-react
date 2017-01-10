package com.mkyong.web.model;

public class QuestionModel {
    String title;
    String comment;
    String tags;
    String token;

    public QuestionModel() {
    }

    public QuestionModel(String title, String comment, String tags) {
        this.title = title;
        this.comment = comment;
        this.tags = tags;
    }

    public QuestionModel(String title, String comment, String tags, String token) {
        this.title = title;
        this.comment = comment;
        this.tags = tags;
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }
}
