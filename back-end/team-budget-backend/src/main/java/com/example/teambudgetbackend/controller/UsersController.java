package com.example.teambudgetbackend.controller;

import com.example.teambudgetbackend.entity.Users;
import com.example.teambudgetbackend.service.UsersService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UsersController {

    private final UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping
    public List<Users> findAll() {
        return usersService.findAll();
    }

    @GetMapping("/{id}")
    public Users findById(@PathVariable Long id) {
        return usersService.findById(id);
    }

    @PostMapping
    public Users save(@RequestBody Users users) {
        return usersService.save(users);
    }

    @PutMapping("/{id}")
    public Users update(@PathVariable Long id, @RequestBody Users users) {
        users.setUser_id(id);   // ← ★ user_id に統一
        return usersService.save(users);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        usersService.delete(id);
    }
}
