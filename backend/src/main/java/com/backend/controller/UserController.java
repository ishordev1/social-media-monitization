package com.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.dto.UserDto;
import com.backend.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;

	// Create User (Signup)
	@PostMapping("/signup")
	public ResponseEntity<UserDto> signup(@RequestBody UserDto userDto) {
		UserDto user = this.userService.createUser(userDto);
		return new ResponseEntity<>(user, HttpStatus.CREATED);
	}

	// Update User by Email
	@PutMapping("/update/{email}")
	public ResponseEntity<UserDto> updateUser(@PathVariable String email, @RequestBody UserDto userDto) {
		UserDto updatedUser = this.userService.updateUser(email, userDto);
		return new ResponseEntity<>(updatedUser, HttpStatus.OK);
	}

	// Delete User by User ID
	@DeleteMapping("/delete/{userId}")
	public ResponseEntity<String> deleteUser(@PathVariable String userId) {
		this.userService.deleteUser(userId);
		return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
	}

	// Get All Users
	@GetMapping
	public ResponseEntity<List<UserDto>> getAllUsers() {
		List<UserDto> users = this.userService.getAllUser();
		return new ResponseEntity<>(users, HttpStatus.OK);
	}

	// Get User by Email
	@GetMapping("/{email}")
	public ResponseEntity<UserDto> getUserByEmail(@PathVariable String email) {
		UserDto user = this.userService.getUserByEmail(email);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
}
