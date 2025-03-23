package com.backend.controller;

import com.backend.dto.ApiResponse;
import com.backend.dto.CampaignDto;
import com.backend.service.CampaignService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
//requiredArgsConstructor is use to generate @Autowire annotation for final field attribute, so not need to add @dautowire annotation
@RequiredArgsConstructor
public class CampaignController {
   
    private final CampaignService campaignService;
    
    
    
    // Create Campaign
    @PostMapping("/{userId}")
    public ResponseEntity<CampaignDto> createCampaign(@Valid @RequestBody CampaignDto campaignDto, @PathVariable String userId) {
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
    
    // Get Campaign by ID
    @GetMapping("/{userId}")
    public ResponseEntity<List<CampaignDto>> getCampaignByUserId(@PathVariable String userId) {
        List<CampaignDto> campaignList = campaignService.getCampaignByUserId(userId);
        return new ResponseEntity<List<CampaignDto>>(campaignList,HttpStatus.OK);
    }
    
}
