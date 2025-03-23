package com.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.InstaPostDto;
import com.backend.models.INSTAPOSTSTATUS;
import com.backend.service.InstaPostService;

import lombok.RequiredArgsConstructor;

@RestController

@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
	private final InstaPostService instaPostService;

	@PostMapping("/{adminId}/accept/post/{postId}/type/{type}")
	ResponseEntity<InstaPostDto> acceptPost(@PathVariable String adminId, @PathVariable String postId,
			@PathVariable String type) {
		INSTAPOSTSTATUS instapostStatus = INSTAPOSTSTATUS.valueOf(type.toUpperCase());
		InstaPostDto post = this.instaPostService.acceptInstaPostByAdmin(adminId, postId,instapostStatus );
		return new ResponseEntity<InstaPostDto>(post,HttpStatus.OK);
	}
	
	
}
