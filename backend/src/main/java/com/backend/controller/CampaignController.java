package com.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.dto.CampaignDto;
import com.backend.service.CampaignService;

import java.util.List;

@RestController
@RequestMapping("/campaigns")
public class CampaignController {

    @Autowired
    private CampaignService campaignService;

    @PostMapping("/{userId}")
    public ResponseEntity<CampaignDto> createCampaign(@PathVariable String userId, @RequestBody CampaignDto campaignDto) {
        CampaignDto createdCampaign = campaignService.createCampaign(userId, campaignDto);
        return new ResponseEntity<>(createdCampaign, HttpStatus.CREATED);
    }

    @PutMapping("/{userId}/{campaignId}")
    public ResponseEntity<CampaignDto> updateCampaign(
            @PathVariable String userId, 
            @PathVariable String campaignId, 
            @RequestBody CampaignDto campaignDto) {
        CampaignDto updatedCampaign = campaignService.updateCampaign(userId, campaignId, campaignDto);
        return new ResponseEntity<>(updatedCampaign, HttpStatus.OK);
    }

    @DeleteMapping("/{userId}/{campaignId}")
    public ResponseEntity<String> deleteCampaign(@PathVariable String userId, @PathVariable String campaignId) {
        campaignService.deleteCampaign(userId, campaignId);
        return new ResponseEntity<>("Campaign deleted successfully", HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<CampaignDto>> getAllCampaigns() {
        List<CampaignDto> campaigns = campaignService.getAllCampaigns();
        return new ResponseEntity<>(campaigns, HttpStatus.OK);
    }

    @GetMapping("/{campaignId}")
    public ResponseEntity<CampaignDto> getCampaignById(@PathVariable String campaignId) {
        CampaignDto campaign = campaignService.getCampaignById(campaignId);
        return new ResponseEntity<>(campaign, HttpStatus.OK);
    }
}
