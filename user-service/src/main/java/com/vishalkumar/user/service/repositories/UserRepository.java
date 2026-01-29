package com.vishalkumar.user.service.repositories;

import com.vishalkumar.user.service.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,String>
{
    Optional<User> findByEmail(String email);
    //if you want to implement any custom method or query
    //write

    //User Operation


}
