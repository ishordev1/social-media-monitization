package com.backend.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.backend.exception.ResourceNotFoundException;
import com.backend.models.Role;
import com.backend.models.User;
import com.backend.models.UserStatus;
import com.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DefaultUserSave implements CommandLineRunner{
private final UserRepository userRepo; 
private final PasswordEncoder passwordEncoder;
	@Override
	public void run(String... args) throws Exception {
		List<User> adminUsers = this.userRepo.findByRole(Role.ADMIN).orElseThrow(()-> new ResourceNotFoundException("admin not found"));
		if(adminUsers.isEmpty()) {
			User user=new User();
			user.setUserId(UUID.randomUUID().toString());
			user.setName("admin");
			user.setEmail("admin@gmail.com");
			user.setInstaUsername("tharooishor");
			user.setPassword(this.passwordEncoder.encode("admin"));
			user.setRole(Role.ADMIN);
			user.setActive(true);
			user.setStatus(UserStatus.VERIFY);
			User saveUser=this.userRepo.save(user);
			System.out.println(saveUser);
		}
		else {
			System.out.println("Admin is already created...");
		}
	
	}
	
	
	

}
