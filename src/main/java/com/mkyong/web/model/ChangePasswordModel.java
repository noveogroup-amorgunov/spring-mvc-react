package com.mkyong.web.model;

public class ChangePasswordModel {
    String password;
    String old_password;
    String token;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getOld_password() {
        return old_password;
    }

    public void setOld_password(String old_password) {
        this.old_password = old_password;
    }

    public ChangePasswordModel(String password, String old_password, String token) {
        this.password = password;
        this.old_password = old_password;
        this.token = token;
    }

    public ChangePasswordModel() {

    }

    public ChangePasswordModel(String password, String token) {
        this.password = password;
        this.token = token;
    }
}
