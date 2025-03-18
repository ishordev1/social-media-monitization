package com.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dto.CampaignDto;
import com.backend.exception.ResourceNotFoundException;
import com.backend.models.Campaign;
import com.backend.models.User;
import com.backend.repository.CampaignRepository;
import com.backend.repository.UserRepository;
import com.backend.service.CampaignService;
import org.modelmapper.ModelMapper;

@Service
public class CampaignServiceImpl implements CampaignService {

    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CampaignDto createCampaign(String userId, CampaignDto campaignDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
        
        Campaign campaign = modelMapper.map(campaignDto, Campaign.class);
        campaign.setUser(user);
        
        Campaign savedCampaign = campaignRepository.save(campaign);
        return modelMapper.map(savedCampaign, CampaignDto.class);
    }

    @Override
    public CampaignDto updateCampaign(String userId, String campaignId, CampaignDto campaignDto) {
        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign not found with ID: " + campaignId));
        
        if (!campaign.getUser().getUserId().equals(userId)) {
            throw new IllegalArgumentException("User is not authorized to update this campaign.");
        }

        campaign.setTitle(campaignDto.getTitle());
        campaign.setAmount(campaignDto.getAmount());
        campaign.setDescription(campaignDto.getDescription());
        campaign.setDistributeAmount(campaignDto.getDistributeAmount());
        campaign.setRemainingAmount(campaignDto.getRemainingAmount());
        
        Campaign updatedCampaign = campaignRepository.save(campaign);
        return modelMapper.map(updatedCampaign, CampaignDto.class);
    }

    @Override
    public Boolean deleteCampaign(String userId, String campaignId) {
        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign not found with ID: " + campaignId));
        
        if (!campaign.getUser().getUserId().equals(userId)) {
            throw new IllegalArgumentException("User is not authorized to delete this campaign.");
        }

        campaignRepository.delete(campaign);
        return true;
    }

    @Override
    public List<CampaignDto> getAllCampaigns() {
        List<Campaign> campaigns = campaignRepository.findAll();
        return campaigns.stream()
                .map(campaign -> modelMapper.map(campaign, CampaignDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public CampaignDto getCampaignById(String campaignId) {
        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign not found with ID: " + campaignId));
        return modelMapper.map(campaign, CampaignDto.class);
    }
}
