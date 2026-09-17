package com.example.teambudgetbackend.repository;

import com.example.teambudgetbackend.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Long> {

    // ★ログイン用：email でユーザーを1件取得
    Users findByEmail(String email);
}
