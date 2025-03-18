package com.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Date;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.dto.CampaignDto;
import com.backend.models.Campaign;
import com.backend.models.User;
import com.backend.repository.CampaignRepository;
import com.backend.repository.UserRepository;
import com.backend.service.CampaignService;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;

@Service
@RequiredArgsConstructor
@Transactional
public class CampaignServiceImpl implements CampaignService {

    private final CampaignRepository campaignRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public CampaignDto createCampaign(String userId, CampaignDto campaignDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Campaign campaign = modelMapper.map(campaignDto, Campaign.class);
        campaign.setCampaignnId(java.util.UUID.randomUUID().toString()); // Generate unique ID
        campaign.setCreatedDate(new Date());
        campaign.setUser(user);

        Campaign savedCampaign = campaignRepository.save(campaign);
        return modelMapper.map(savedCampaign, CampaignDto.class);
    }

    @Override
    public CampaignDto updateCampaign(String campaignId, CampaignDto campaignDto) {
        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new RuntimeException("Campaign not found with id: " + campaignId));

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
                .orElseThrow(() -> new RuntimeException("Campaign not found with id: " + campaignId));

        if (!campaign.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("User is not authorized to delete this campaign");
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
                .orElseThrow(() -> new RuntimeException("Campaign not found with id: " + campaignId));

        return modelMapper.map(campaign, CampaignDto.class);
    }
    
}
