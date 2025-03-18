package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.models.Campaign;

public interface CampaignRepository extends JpaRepository<Campaign, String> {
}
