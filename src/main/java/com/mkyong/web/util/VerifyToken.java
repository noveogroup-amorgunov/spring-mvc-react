package com.mkyong.web.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import org.springframework.beans.factory.annotation.Value;

public class VerifyToken {

    @Value("${jwt.secret}")
    private static String key;


    public static boolean run(String token) {

        try {
            if (token == null) {
                throw new SignatureException("Token is required");
            }

            return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody().getSubject() != null;

        } catch (Exception e) {
            return false;
        }
    }

    public static String getUserName(String token) {
        if (run(token)) {
            return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody().getSubject();
        } else {
            return null;
        }
    }
}
