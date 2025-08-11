package com.backend.dto;

import java.util.Date;

import com.backend.models.Campaign;
import com.backend.models.INSTAPOSTSTATUS;
import com.backend.models.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class InstaPostDto {
    private String instaPostId;
    private String postUrl;
    private String productUniqueCode;
    private Date date;
    private Double cashback;
    private INSTAPOSTSTATUS STATUS;
    private String description;
    private Boolean adminVisit;
    
    private UserDto user;  
    private String campaignId; 
}
