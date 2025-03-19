package com.backend.service;

import java.util.List;

import com.backend.dto.InstaPostDto;

public interface InstaPostService {
InstaPostDto createInstaPost(String userId,String campaignId,InstaPostDto instaPostDto);
InstaPostDto updateInstaPost(String userId,String campaignId,String instaPostId,InstaPostDto instaPostDto);
InstaPostDto getInstaPostById(String instaPost);
List<InstaPostDto> getInstaPostByUserId(String userId);
List<InstaPostDto> getInstaPostByCampaignId(String campaignId);
List<InstaPostDto> getAllInstaPost();

InstaPostDto updateInstaPostByAdmin(String instaPostId,InstaPostDto instaPostDto);

}
