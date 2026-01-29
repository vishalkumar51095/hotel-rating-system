package com.vishalkumar.auth_service.controller;

import com.vishalkumar.auth_service.dto.AuthResponse;
import com.vishalkumar.auth_service.dto.LoginRequest;
import com.vishalkumar.auth_service.dto.RegisterRequest;
import com.vishalkumar.auth_service.service.AuthService;
import feign.FeignException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * Register new user + return JWT
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {

        try {
            String token = authService.register(request);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new AuthResponse(
                            token,
                            request.getEmail(),
                            "User registered successfully"
                    ));

        } catch (FeignException.Conflict ex) {

            String message = ex.contentUTF8() != null && !ex.contentUTF8().isBlank()
                    ? ex.contentUTF8()
                    : "Email already registered";

            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new AuthResponse(
                            null,
                            request.getEmail(),
                            message
                    ));

        } catch (FeignException ex) {

            return ResponseEntity.status(ex.status())
                    .body(new AuthResponse(
                            null,
                            request.getEmail(),
                            "Registration failed"
                    ));
        }
    }



    /**
     * Login existing user
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {

        try {
            String token = authService.login(request);

            return ResponseEntity.ok(
                    new AuthResponse(
                            token,
                            request.getEmail(),
                            "Login successful"
                    )
            );

        } catch (FeignException.Unauthorized ex) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(
                            null,
                            request.getEmail(),
                            "Invalid email or password"
                    ));

        } catch (FeignException ex) {

            return ResponseEntity.status(ex.status())
                    .body(new AuthResponse(
                            null,
                            request.getEmail(),
                            "Login failed"
                    ));
        }
    }

}
