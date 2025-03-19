package com.backend.dto;

import java.util.Date;
import java.util.List;

import com.backend.models.CAMPAIGNSTATUS;
import com.backend.models.InstaPost;
import com.backend.models.User;

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
    private CAMPAIGNSTATUS status;
    private User user;
    private List<InstaPost> posts; 
}
