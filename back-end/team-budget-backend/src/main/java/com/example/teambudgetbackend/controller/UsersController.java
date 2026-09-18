package com.example.teambudgetbackend.controller;

import com.example.teambudgetbackend.entity.Users;
import com.example.teambudgetbackend.service.UsersService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    private final UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping
    public List<Users> findAll() {
        return usersService.findAll();
    }

    @GetMapping("/{userId}")
    public Users findById(@PathVariable Long userId) {
        return usersService.findById(userId);
    }

    @PostMapping
    public Users save(@RequestBody Users users) {
        return usersService.save(users);
    }

    @PutMapping("/{userId}")
    public Users update(@PathVariable Long userId, @RequestBody Users users) {
        users.setUserId(userId);
        return usersService.save(users);
    }

    @DeleteMapping("/{userId}")
    public void delete(@PathVariable Long userId) {
        usersService.delete(userId);
    }
}