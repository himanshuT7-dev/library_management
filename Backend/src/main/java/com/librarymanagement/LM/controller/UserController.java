package com.librarymanagement.LM.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.librarymanagement.LM.entity.User;
import com.librarymanagement.LM.repository.UserRepository;
import com.librarymanagement.LM.services.UserServices;

@RestController
@RequestMapping("/auth")
public class UserController {
    
    @Autowired
    private UserServices userServices;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired  // Add this annotation
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return userServices.register(user.getUsername(), user.getPassword());
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> credentials) {
        Map<String, String> response = new HashMap<>();
        String username = credentials.get("username");
        String password = credentials.get("password");

        System.out.println("🔹 Login attempt for username: " + username);

        User user = userRepository.findByUsername(username).orElse(null);
        
        if (user == null) {
            System.out.println("❌ User not found in database!");
            response.put("message", "User not found!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            System.out.println("❌ Invalid password!");
            response.put("message", "Invalid credentials!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        response.put("status", "success");
        response.put("message", "Login successful!");
        response.put("username", user.getUsername());

        return ResponseEntity.ok(response);
    }
}