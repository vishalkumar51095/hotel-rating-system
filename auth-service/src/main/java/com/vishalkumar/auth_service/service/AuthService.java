package com.vishalkumar.auth_service.service;

import com.vishalkumar.auth_service.dto.LoginRequest;
import com.vishalkumar.auth_service.dto.RegisterRequest;
import com.vishalkumar.auth_service.dto.UserCreateRequest;
import com.vishalkumar.auth_service.external.UserServiceClient;
import com.vishalkumar.auth_service.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserServiceClient userServiceClient;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public String register(RegisterRequest request) {

        UserCreateRequest user = new UserCreateRequest();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setAbout(request.getAbout());
        user.setRoles(List.of("USER"));

        // call user-service
        userServiceClient.createUser(user);

        // generate JWT
        return jwtUtil.generateToken(
                request.getEmail(),
                List.of("USER")
        );

    }



    public String login(LoginRequest request) {

        Map<String, Object> user =
                userServiceClient.getUserByEmail(request.getEmail());

        String encodedPassword = (String) user.get("password");

        if (!passwordEncoder.matches(request.getPassword(), encodedPassword)) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwtUtil.generateToken(
                request.getEmail(),
                List.of("USER")
        );
    }
}

