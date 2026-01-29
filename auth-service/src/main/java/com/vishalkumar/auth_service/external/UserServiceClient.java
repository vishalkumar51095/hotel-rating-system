package com.vishalkumar.auth_service.external;

import com.vishalkumar.auth_service.dto.RegisterRequest;
import com.vishalkumar.auth_service.dto.UserCreateRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@FeignClient(name = "user-service", url = "${user-service.url}")
public interface UserServiceClient {

    @PostMapping("/users/")
    void createUser(@RequestBody UserCreateRequest request);

    @GetMapping("/users/email/{email}")
    Map<String, Object> getUserByEmail(@PathVariable String email);
}
