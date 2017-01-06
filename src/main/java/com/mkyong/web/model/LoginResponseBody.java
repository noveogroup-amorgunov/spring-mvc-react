package com.mkyong.web.model;

import com.fasterxml.jackson.annotation.JsonView;
import com.mkyong.web.jsonview.Views;

public class LoginResponseBody {

    @JsonView(Views.Public.class)
    Boolean authenticated;

    @JsonView(Views.Public.class)
    String token;

    public LoginResponseBody() {
    }

    public LoginResponseBody(Boolean authenticated, String token) {
        this.authenticated = authenticated;
        this.token = token;
    }

    public Boolean getAuthenticated() {
        return authenticated;
    }

    public void setAuthenticated(Boolean authenticated) {
        this.authenticated = authenticated;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
