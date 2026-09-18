package com.example.teambudgetbackend.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AuthInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 1. プリフライトリクエスト(CORS)はスルー
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        // 2. 新規アカウント作成 (POST /api/users) は未ログインでも許可
        if ("POST".equalsIgnoreCase(request.getMethod()) && "/api/users".equals(request.getRequestURI())) {
            return true;
        }

        // 3. それ以外の /api/** へのアクセスはトークンを必須チェック
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer auth-token-")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write("{\"message\": \"未認証のアクセスです\"}");
            return false;
        }
        return true;
    }
}