package com.vishalkumar.user.service.services;


import com.vishalkumar.user.service.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    //user operations

    //create
    User saveUser(User user);

    //get all user
    List<User> getAllUser();

    //get single user of given userId

    User getUser(String userId);


    Optional<User> getUserByEmail(String email);
}
