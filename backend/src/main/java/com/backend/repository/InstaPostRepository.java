package com.backend.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.models.InstaPost;

public interface InstaPostRepository extends JpaRepository<InstaPost, String> {
	List<InstaPost> findByUserUserId(String userId);
	List<InstaPost> findByCampaignCampaignId(String campaignId);
	Optional<InstaPost> findByPostUrl(String postUrl);
	Optional<InstaPost> findByProductUniqueCode(String uniqueCode);
}
