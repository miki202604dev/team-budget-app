package com.example.teambudgetbackend.service;

import com.example.teambudgetbackend.entity.Users;
import com.example.teambudgetbackend.repository.UsersRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {

    private final UsersRepository usersRepository;

    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public List<Users> findAll() {
        return usersRepository.findAll();
    }

    public Users findById(Long id) {
        return usersRepository.findById(id).orElse(null);
    }

    public Users save(Users users) {
        return usersRepository.save(users);
    }

    public void delete(Long id) {
        usersRepository.deleteById(id);
    }

    // ⭐今回追加するメソッド（ログイン認証で使う）
    public Users findByEmail(String email) {
        return usersRepository.findByEmail(email);
    }
}
