package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.models.Campaign;

public interface CampaignRepository extends JpaRepository<Campaign, String> {
	List<Campaign> findByUser_UserId(String userId);
}
