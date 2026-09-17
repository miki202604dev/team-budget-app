package com.example.teambudgetbackend.controller;

import com.example.teambudgetbackend.entity.Users;
import com.example.teambudgetbackend.service.UsersService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000")   // ←★追加したのはこの1行だけ
public class LoginController {

    private final UsersService usersService;

    public LoginController(UsersService usersService) {
        this.usersService = usersService;
    }

    // ★ログイン用のリクエストDTO
    public static class LoginRequest {
        public String email;
        public String password;
    }

    @PostMapping
    public String login(@RequestBody LoginRequest request) {

        // ★メールでユーザーを検索
        Users user = usersService.findByEmail(request.email);

        if (user == null) {
            return "メールアドレスが存在しません";
        }

        // ★パスワード照合（今回は平文で比較）
        if (!user.getPassword().equals(request.password)) {
            return "パスワードが違います";
        }

        // ★認証成功
        return "login success";
    }
}
