package com.example.Book_Library_Management_System.controller;

import com.example.Book_Library_Management_System.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        boolean valid = adminService.validateAdmin(username, password);
        return valid ? "Login successful" : "Invalid username or password";
    }
}
