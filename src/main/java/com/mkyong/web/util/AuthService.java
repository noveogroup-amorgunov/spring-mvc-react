package com.mkyong.web.util;

import com.sun.org.apache.xpath.internal.operations.Bool;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;

import java.util.Objects;

public class AuthService {
    private String userName;
    private Boolean isAuth;
    private Boolean isAdmin;

    private String message;

    private String key;



    public AuthService() {
        isAuth = false;
        isAdmin = false;
        userName = null;
    }

    public AuthService(String token, String key1) {
        isAuth = false;
        isAdmin = false;
        userName = null;

        key = key1;
        verifyToken(token);
    }


    public boolean verifyToken(String token) {

        try {
            userName = Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody().getSubject();
            isAuth = true;
            isAdmin = Objects.equals(userName, "admin");
            message = "userName equals " + userName;
            return true;

        } catch (Exception e) {
            isAuth = false;
            isAdmin = false;
            message = e.getMessage();
            return false;
        }
    }


    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getAdmin() {
        return isAdmin;
    }

    public void setAdmin(Boolean admin) {
        isAdmin = admin;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Boolean getAuth() {
        return isAuth;
    }

    public void setAuth(Boolean auth) {
        isAuth = auth;
    }
}
