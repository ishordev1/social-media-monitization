package com.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.dto.InstaPostDto;
import com.backend.service.InstaPostService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/instapost")
@Tag(name="User Instagram Post", description="Create, Read, Delete, Update,")
@RequiredArgsConstructor
public class InstaPostController {

    private final InstaPostService instaPostService;

    @PostMapping("/campaign/{campaignId}/participate/user/{userId}")
    public ResponseEntity<InstaPostDto> createInstaPost(
            @PathVariable String userId,
            @PathVariable String campaignId,
            @RequestBody InstaPostDto instaPostDto) {
        InstaPostDto createdPost = instaPostService.createInstaPost(userId, campaignId, instaPostDto);
        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }

    @PutMapping("/{userId}/{campaignId}/{instaPostId}")
    public ResponseEntity<InstaPostDto> updateInstaPost(
            @PathVariable String userId,
            @PathVariable String campaignId,
            @PathVariable String instaPostId,
            @RequestBody InstaPostDto instaPostDto) {
        InstaPostDto updatedPost = instaPostService.updateInstaPost(userId, campaignId, instaPostId, instaPostDto);
        return ResponseEntity.ok(updatedPost);
    }

    @GetMapping("/{instaPostId}")
    public ResponseEntity<InstaPostDto> getInstaPostById(@PathVariable String instaPostId) {
        InstaPostDto instaPost = instaPostService.getInstaPostById(instaPostId);
        return ResponseEntity.ok(instaPost);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<InstaPostDto>> getInstaPostByUserId(@PathVariable String userId) {
        List<InstaPostDto> instaPosts = instaPostService.getInstaPostByUserId(userId);
        return ResponseEntity.ok(instaPosts);
    }

    @GetMapping("/campaign/{campaignId}")
    public ResponseEntity<List<InstaPostDto>> getInstaPostByCampaignId(@PathVariable String campaignId) {
        List<InstaPostDto> instaPosts = instaPostService.getInstaPostByCampaignId(campaignId);
        return ResponseEntity.ok(instaPosts);
    }

    @GetMapping
    public ResponseEntity<List<InstaPostDto>> getAllInstaPosts() {
        List<InstaPostDto> instaPosts = instaPostService.getAllInstaPost();
        return ResponseEntity.ok(instaPosts);
    }

 
}
