package com.mkyong.web.model;

public class AnswerModel {
    String message;
    long question_id;
    String token;

    public AnswerModel() {
    }

    public AnswerModel(String message, long question_id, String token) {
        this.message = message;
        this.question_id = question_id;
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public long getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(long question_id) {
        this.question_id = question_id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
