package com.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.backend.dto.UserDto;
import com.backend.security.Request;
import com.backend.security.Response;
import com.backend.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
@Tag(name="User", description="Create, Read, Delete, Update,")
public class UserController {

	@Autowired
	private UserService userService;

	// Create User (Signup)
	@Operation(summary="signup user")
	@PostMapping
	public ResponseEntity<UserDto> signup(@Valid @RequestBody UserDto userDto) {
		UserDto user = this.userService.createUser(userDto);
		return new ResponseEntity<>(user, HttpStatus.CREATED);
	}
	

	@Operation(summary="update user by email")
	// Update User by Email
	@PutMapping("/{email}")
	public ResponseEntity<UserDto> updateUser(@PathVariable String email, @RequestBody UserDto userDto) {
		UserDto updatedUser = this.userService.updateUser(email, userDto);
		return new ResponseEntity<>(updatedUser, HttpStatus.OK);
	}

	@Operation(summary="delete user by id")
	// Delete User by User ID
	@DeleteMapping("/{userId}")
	public ResponseEntity<String> deleteUser(@PathVariable String userId) {
		this.userService.deleteUser(userId);
		return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
	}

	// Get All Users
	@Operation(summary="get all user")
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
	
	@Operation(summary="insta userId")
	 @GetMapping("/insta/{username}")
	    public ResponseEntity<Map> getInstagramUser(@PathVariable String username) {
	        RestTemplate restTemplate = new RestTemplate();

	        String url1 = "https://i.instagram.com/api/v1/users/web_profile_info/?username=" + username;
	        String url2 = "https://www.instagram.com/" + username + "/?__a=1&__d=dis";

	        // Headers set karna zaroori hai warna Instagram request block kar sakta hai
	        HttpHeaders headers = new HttpHeaders();
	        headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
	        headers.set("X-IG-App-ID", "936619743392459");

	        HttpEntity<String> entity = new HttpEntity<>(headers);

	        try {
	            ResponseEntity<Map> response = restTemplate.exchange(url1, HttpMethod.GET, entity, Map.class);
	            
	            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
	                Map<String, Object> responseBody = response.getBody(); 
	            } else {
	                System.out.println("Failed to fetch data!");
	            }
	            
	            
	            return ResponseEntity.ok(response.getBody());
	        } catch (Exception e) {
	            System.out.println("First API failed, trying alternative...");

	            // Agar pehla API fail hota hai to doosra try karega
	            try {
	                ResponseEntity<Map> response = restTemplate.exchange(url2, HttpMethod.GET, entity, Map.class);
	                return ResponseEntity.ok(response.getBody());
	            } catch (Exception ex) {
	                System.out.println("Both APIs failed.");
	                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                        .body(Map.of("error", "Failed to fetch data. Profile may be private or Instagram blocked the request."));
	            }
	        }
	    }
	
	
	
	
}
