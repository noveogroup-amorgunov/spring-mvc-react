package com.mkyong.web.service;

import com.mkyong.web.entity.User;
import java.util.List;

public interface UserService {
    User addUser(User user);
    void delete(long id);
    User getByUsername(String name);
    User getById(Long id);
    User editUser(User user);
    List<User> getAll();
    boolean isUserExist(User user);
}