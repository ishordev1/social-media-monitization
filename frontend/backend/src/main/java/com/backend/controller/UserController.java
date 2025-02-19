package com.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.UserDto;
import com.backend.service.UserService;

@RestController
public class UserController {
	@Autowired
	private UserService userService;
	
@PostMapping("/signup")
public ResponseEntity<UserDto> signup(@RequestBody UserDto userDto){
	UserDto user = this.userService.createUser(userDto);
	return new ResponseEntity<UserDto>(user,HttpStatus.CREATED);
}

}
