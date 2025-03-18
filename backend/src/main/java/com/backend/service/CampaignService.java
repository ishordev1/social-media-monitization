package com.backend.service;

import java.util.List;

import com.backend.dto.CampaignDto;

public interface CampaignService {
    CampaignDto createCampaign(String userId,CampaignDto campaignDto);
    CampaignDto updateCampaign(String campaignId, CampaignDto campaignDto);
    Boolean deleteCampaign(String userId,String campaignId);
    List<CampaignDto> getAllCampaigns();
    CampaignDto getCampaignById(String campaignId);
}
