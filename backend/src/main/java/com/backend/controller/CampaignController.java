package com.backend.controller;

import com.backend.dto.ApiResponse;
import com.backend.dto.CampaignDto;
import com.backend.service.CampaignService;


import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
@RequiredArgsConstructor
public class CampaignController {

    private final CampaignService campaignService;

    // Create Campaign
    @PostMapping("/{userId}")
    public ResponseEntity<CampaignDto> createCampaign(@PathVariable String userId, @RequestBody CampaignDto campaignDto) {
        CampaignDto createdCampaign = campaignService.createCampaign(userId, campaignDto);
        return ResponseEntity.ok(createdCampaign);
    }

    // Update Campaign
    @PutMapping("/{campaignId}")
    public ResponseEntity<CampaignDto> updateCampaign(@PathVariable String campaignId, @RequestBody CampaignDto campaignDto) {
        CampaignDto updatedCampaign = campaignService.updateCampaign(campaignId, campaignDto);
        return ResponseEntity.ok(updatedCampaign);
    }

    // Delete Campaign
    @DeleteMapping("/{userId}/{campaignId}")
    public ResponseEntity<ApiResponse> deleteCampaign(@PathVariable String userId, @PathVariable String campaignId) {
        Boolean isDeleted = campaignService.deleteCampaign(userId, campaignId);
        if (isDeleted) {
            return ResponseEntity.ok(new ApiResponse("Campaign deleted successfully", true));
        }
        return ResponseEntity.badRequest().body(new ApiResponse("Failed to delete campaign", false));
    }

    // Get all Campaigns
    @GetMapping
    public ResponseEntity<List<CampaignDto>> getAllCampaigns() {
        List<CampaignDto> campaigns = campaignService.getAllCampaigns();
        return ResponseEntity.ok(campaigns);
    }

    // Get Campaign by ID
    @GetMapping("/{campaignId}")
    public ResponseEntity<CampaignDto> getCampaignById(@PathVariable String campaignId) {
        CampaignDto campaign = campaignService.getCampaignById(campaignId);
        return ResponseEntity.ok(campaign);
    }
}
