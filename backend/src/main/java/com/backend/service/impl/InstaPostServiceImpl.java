package com.backend.service.impl;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.dto.CampaignDto;
import com.backend.dto.InstaPostDto;
import com.backend.dto.TransactionDto;
import com.backend.exception.ResourceNotFoundException;
import com.backend.models.CAMPAIGNSTATUS;
import com.backend.models.Campaign;
import com.backend.models.INSTAPOSTSTATUS;
import com.backend.models.InstaPost;
import com.backend.models.User;
import com.backend.repository.CampaignRepository;
import com.backend.repository.InstaPostRepository;
import com.backend.repository.UserRepository;
import com.backend.service.CampaignService;
import com.backend.service.InstaPostService;
import com.backend.service.TransactionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class InstaPostServiceImpl implements InstaPostService {

	private final InstaPostRepository instaPostRepository;
	private final UserRepository userRepository;
	private final CampaignService campaignService;
	private final ModelMapper modelMapper;

	private final TransactionService transactionService;

	@Override
	public InstaPostDto createInstaPost(String userId, String campaignId, InstaPostDto instaPostDto) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

		CampaignDto campaignDto = this.campaignService.getCampaignById(campaignId);
		Campaign campaign = this.modelMapper.map(campaignDto, Campaign.class);
	
		
		InstaPost instaPost = modelMapper.map(instaPostDto, InstaPost.class);
		// base on userInstaScore amount will give check
		if (campaign.getRemainingAmount() < 0) {
			campaignDto.setStatus(CAMPAIGNSTATUS.CLOSE);
			this.campaignService.updateCampaign(campaignId, campaignDto);
			throw new ResourceNotFoundException("insuffent balance in campaign. better luck next time.");

		}
		instaPost.setInstaPostId(UUID.randomUUID().toString());
		instaPost.setUser(user);
		instaPost.setCampaign(campaign);
		instaPost.setSTATUS(INSTAPOSTSTATUS.PENDING);
		instaPost.setDate(new Date());
		// set the balance of post amount base on user score
		double userScoreAmount = 200.0;
		instaPost.setCashback(userScoreAmount);
		InstaPost savedPost = instaPostRepository.save(instaPost);
		// reduce campaign balance
		campaignDto.setDistributeAmount(campaignDto.getDistributeAmount() + userScoreAmount);

		double remain = campaignDto.getAmount() - campaignDto.getDistributeAmount();
		campaignDto.setRemainingAmount(remain);
		if (remain < 0) {
			campaignDto.setStatus(CAMPAIGNSTATUS.CLOSE);
		}
		
		this.campaignService.updateCampaign(campaignId, campaignDto);


		return modelMapper.map(savedPost, InstaPostDto.class);
	}

	@Override
	public InstaPostDto updateInstaPost(String userId, String campaignId, String instaPostId,
			InstaPostDto instaPostDto) {
		InstaPost instaPost = instaPostRepository.findById(instaPostId)
				.orElseThrow(() -> new ResourceNotFoundException("InstaPost not found with id: " + instaPostId));

		if (!instaPost.getUser().getUserId().equals(userId)) {
			throw new IllegalArgumentException("You are not authorized to update this post.");
		}

		if (!instaPost.getCampaign().getCampaignId().equals(campaignId)) {
			throw new IllegalArgumentException("This InstaPost does not belong to the specified Campaign.");
		}

		instaPost.setPostUrl(instaPostDto.getPostUrl());
		instaPost.setProductUniqueCode(instaPostDto.getProductUniqueCode());

		instaPost.setDescription(instaPostDto.getDescription());

		InstaPost updatedPost = instaPostRepository.save(instaPost);
		return modelMapper.map(updatedPost, InstaPostDto.class);
	}

	@Override
	public InstaPostDto getInstaPostById(String instaPostId) {
		InstaPost instaPost = instaPostRepository.findById(instaPostId)
				.orElseThrow(() -> new ResourceNotFoundException("InstaPost not found with id: " + instaPostId));

		return modelMapper.map(instaPost, InstaPostDto.class);
	}

	@Override
	public List<InstaPostDto> getInstaPostByUserId(String userId) {
		List<InstaPost> instaPosts = instaPostRepository.findByUserUserId(userId);
		return instaPosts.stream().map(post -> modelMapper.map(post, InstaPostDto.class)).collect(Collectors.toList());
	}

	@Override
	public List<InstaPostDto> getInstaPostByCampaignId(String campaignId) {
		List<InstaPost> instaPosts = instaPostRepository.findByCampaignCampaignId(campaignId);
		return instaPosts.stream().map(post -> modelMapper.map(post, InstaPostDto.class)).collect(Collectors.toList());
	}

	@Override
	public List<InstaPostDto> getAllInstaPost() {
		List<InstaPost> instaPosts = instaPostRepository.findAll();
		return instaPosts.stream().map(post -> modelMapper.map(post, InstaPostDto.class)).collect(Collectors.toList());
	}

	@Override
	public InstaPostDto acceptInstaPostByAdmin(String adminUserId,String instaPostId, INSTAPOSTSTATUS status) {
		InstaPost instaPost = instaPostRepository.findById(instaPostId)
				.orElseThrow(() -> new ResourceNotFoundException("InstaPost not found with id: " + instaPostId));
		User admin=this.userRepository.findById(adminUserId).orElseThrow(()-> new ResourceNotFoundException("Admin not found in this id:"+adminUserId));
		
		
		if(instaPost.getCampaign().getCampaignId() ==null) {
			throw new ResourceNotFoundException("sorry campaign is deleted.....");
		}
		
		CampaignDto campaignDto=this.campaignService.getCampaignById(instaPost.getCampaign().getCampaignId());
	
		if(status.toString().equalsIgnoreCase("REJECTED")) {
			campaignDto.setRemainingAmount(campaignDto.getRemainingAmount()+instaPost.getCashback());
			campaignDto.setDistributeAmount(campaignDto.getDistributeAmount()-instaPost.getCashback());
			this.campaignService.updateCampaign(campaignDto.getCampaignId(), campaignDto); 
		}
		else if(status.toString().equalsIgnoreCase("ACCEPTED")) {
			// after approval also transfer balance in user Account
			TransactionDto creditTransactionDetails = new TransactionDto();
			creditTransactionDetails.setAmount(instaPost.getCashback());
			creditTransactionDetails.setBank("SMM official");
			creditTransactionDetails.setPaymentMode("online");
			
			this.transactionService.addMoney(creditTransactionDetails, instaPost.getUser().getUserId());
		
			// company account money reduce
			TransactionDto debitTransactionDetails = new TransactionDto();
			debitTransactionDetails.setAmount(instaPost.getCashback());
			debitTransactionDetails.setBank("SMM official");
			debitTransactionDetails.setPaymentMode("online");
			this.transactionService.debitMoney(debitTransactionDetails, adminUserId);
		}
		
		
		
		instaPost.setSTATUS(status);
		instaPost.setAdminVisit(true);
		InstaPost updatedPost = instaPostRepository.save(instaPost);
		
		
		return modelMapper.map(updatedPost, InstaPostDto.class);
	}
}
