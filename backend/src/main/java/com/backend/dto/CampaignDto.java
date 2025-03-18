package com.backend.dto;

import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CampaignDto {
    private String campaignId;
    private String title;
    private Double amount;
    private String description;
    private Date createdDate;
    private Double distributeAmount;
    private Double remainingAmount;
    private String userId;
    private List<CampaignParticipationDto> participants;
}
