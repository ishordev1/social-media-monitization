package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CampaignParticipationDto {
    private String participationId;
    private String userId;
    private String campaignId;
    private Double earnedAmount;
}
