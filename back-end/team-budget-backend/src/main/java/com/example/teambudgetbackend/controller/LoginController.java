package com.example.teambudgetbackend.controller;

import com.example.teambudgetbackend.entity.Users;
import com.example.teambudgetbackend.service.UsersService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/login")
public class LoginController {

    private final UsersService usersService;
    private final PasswordEncoder passwordEncoder;

    public LoginController(UsersService usersService, PasswordEncoder passwordEncoder) {
        this.usersService = usersService;
        this.passwordEncoder = passwordEncoder;
    }

    public static class LoginRequest {
        public String email;
        public String password;
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Users user = usersService.findByEmail(request.email);

        if (user == null || !passwordEncoder.matches(request.password, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "メールアドレスまたはパスワードが正しくありません"));
        }

        return ResponseEntity.ok(Map.of(
                "token", "Bearer auth-token-" + user.getUserId(),
                "userId", user.getUserId(),
                "name", user.getName(),
                "email", user.getEmail()
        ));
    }
}