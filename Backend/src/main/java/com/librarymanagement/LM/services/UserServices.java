package com.librarymanagement.LM.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.librarymanagement.LM.entity.User;
import com.librarymanagement.LM.repository.UserRepository;

@Service
public class UserServices {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	
	public String register(String username,String password) {
		if(userRepository.findByUsername(username).isPresent()) {
			return "Username already exists!";
		}
		User user = new User();
		user.setUsername(username);
		user.setPassword(passwordEncoder.encode(password));
		userRepository.save(user);
		return "User registered successfully!";
	}
	
	public String login(String username,String password) {
		User user = userRepository.findByUsername(username).orElse(null);
		
		if(user==null) {
			return "User not found!";
		}
		
		if(!passwordEncoder.matches(password, user.getPassword())) {
			return "Invalid Credentials";
		}
		
		return "User Login Successfull";
	}
}