package com.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.UserDto;
import com.backend.jwt.JwtHelper;
import com.backend.models.User;
import com.backend.security.Request;
import com.backend.security.Response;
import com.backend.service.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@Tag(name="public Api")
public class AuthController {
	
	@Autowired
	private AuthenticationManager authManager;

	@Autowired
	private JwtHelper helper;

	@Autowired
	private UserDetailsService userDetailsService;
	@Autowired
	private UserService userService;

	// Create User (Signup)
		@PostMapping("/signup")
		public ResponseEntity<UserDto> signup(@Valid @RequestBody UserDto userDto) {
			UserDto user = this.userService.createUser(userDto);
			return new ResponseEntity<>(user, HttpStatus.CREATED);
		}

		@PostMapping("/signin")
		public ResponseEntity<Response> signin(@RequestBody Request request){
				Authentication authenticate = this.authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
		        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
		        String token = this.helper.generateToken(userDetails);
		      
		    UserDto user = this.userService.getUserByEmail( userDetails.getUsername());
				Response res=Response.builder().token(token).user(user).build();
				return new ResponseEntity<>(res,HttpStatus.OK);
		}

	
}
