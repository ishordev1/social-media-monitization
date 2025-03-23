package com.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Date;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.dto.BalanceInfoDto;
import com.backend.dto.CampaignDto;
import com.backend.dto.TransactionDto;
import com.backend.exception.ResourceNotFoundException;
import com.backend.models.CAMPAIGNSTATUS;
import com.backend.models.Campaign;
import com.backend.models.InstaPost;
import com.backend.models.Role;
import com.backend.models.Transaction;
import com.backend.models.User;
import com.backend.repository.CampaignRepository;
import com.backend.repository.InstaPostRepository;
import com.backend.repository.UserRepository;
import com.backend.service.BalanceInfoService;
import com.backend.service.CampaignService;
import com.backend.service.TransactionService;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;

@Service
@RequiredArgsConstructor
@Transactional
public class CampaignServiceImpl implements CampaignService {

	private final CampaignRepository campaignRepository;
	private final BalanceInfoService balanceInfoService;
	private final UserRepository userRepository;
	private final ModelMapper modelMapper;
	private final TransactionService transactionService;
	private final InstaPostRepository instaPostRepository;

	@Override
	public CampaignDto createCampaign(String userId, CampaignDto campaignDto) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
		BalanceInfoDto balanceInfo = this.balanceInfoService.getBalanceByUserId(userId);
		if (balanceInfo.getTotalBalance() < campaignDto.getAmount()) {
			throw new ResourceNotFoundException("Insuffient balance, please load balance...");
		}
		Campaign campaign = modelMapper.map(campaignDto, Campaign.class);
		campaign.setCampaignId(java.util.UUID.randomUUID().toString()); // Generate unique ID
		campaign.setCreatedDate(new Date());
		campaign.setUser(user);
		campaign.setStatus(CAMPAIGNSTATUS.RUNNING);
		Campaign savedCampaign = campaignRepository.save(campaign);
		TransactionDto transactionDto = new TransactionDto();
		transactionDto.setAmount(campaign.getAmount());
		transactionDto.setBank("SMM");
		transactionDto.setPaymentMode("UPI");
//
		//money transfer admin account
		List<User> adminList =  this.userRepository.findByRole(Role.ADMIN).orElseThrow(()-> new ResourceNotFoundException("Admin not found"));
		User admin=adminList.get(0);
		TransactionDto transaction=new TransactionDto();
		transaction.setAmount(campaignDto.getAmount());
		transaction.setBank("SMM");
		transaction.setPaymentMode("ONLINE");
		this.transactionService.addMoney(transactionDto, admin.getUserId());
		
		
		//reduce the brand acount money
		this.transactionService.debitMoney(transaction, userId);
		
		
		return modelMapper.map(savedCampaign, CampaignDto.class);
	}

	@Override
	public CampaignDto updateCampaign(String campaignId, CampaignDto campaignDto) {
		Campaign campaign = campaignRepository.findById(campaignId)
				.orElseThrow(() -> new ResourceNotFoundException("Campaign not found with id: " + campaignId));

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
				.orElseThrow(() -> new ResourceNotFoundException("Campaign not found with id: " + campaignId));

		if (!campaign.getUser().getUserId().equals(userId)) {
			throw new ResourceNotFoundException("User is not authorized to delete this campaign");
		}

		// Check agar InstaPosts hai to hi NULL set kare
		if (campaign.getPosts() != null && !campaign.getPosts().isEmpty()) {
			for (InstaPost post : campaign.getPosts()) {
				post.setCampaign(null);
			}
			instaPostRepository.saveAll(campaign.getPosts()); // Update InstaPost
		}

		// Ab campaign delete kar sakte ho
		campaignRepository.delete(campaign);

		return true;
	}

	@Override
	public List<CampaignDto> getAllCampaigns() {
		List<Campaign> campaigns = campaignRepository.findAll();
		return campaigns.stream().map(campaign -> modelMapper.map(campaign, CampaignDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public CampaignDto getCampaignById(String campaignId) {
		Campaign campaign = campaignRepository.findById(campaignId)
				.orElseThrow(() -> new ResourceNotFoundException("Campaign not found with id: " + campaignId));

		return modelMapper.map(campaign, CampaignDto.class);
	}

	@Override
	public List<CampaignDto> getCampaignByUserId(String userId) {
		List<Campaign> campaignList = this.campaignRepository.findByUser_UserId(userId);
		List<CampaignDto> campaignDto = campaignList.stream()
				.map(campaign -> this.modelMapper.map(campaign, CampaignDto.class)).collect(Collectors.toList());
		return campaignDto;
	}

}
