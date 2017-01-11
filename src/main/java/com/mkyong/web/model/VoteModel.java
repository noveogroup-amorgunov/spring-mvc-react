package com.mkyong.web.model;

public class VoteModel {
    long answer_id;
    long question_id;
    String token;
    String mark;

    public VoteModel() {
    }

    public VoteModel(long answer_id, long question_id, String token) {
        this.answer_id = answer_id;
        this.question_id = question_id;
        this.token = token;
    }

    public VoteModel(long answer_id, long question_id, String token, String mark) {
        this.answer_id = answer_id;
        this.question_id = question_id;
        this.token = token;
        this.mark = mark;
    }

    public long getAnswer_id() {
        return answer_id;
    }

    public String getMark() {
        return mark;
    }

    public void setMark(String mark) {
        this.mark = mark;
    }

    public void setAnswer_id(long answer_id) {
        this.answer_id = answer_id;
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
