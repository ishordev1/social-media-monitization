package com.backend.dto;

import java.util.Date;

import com.backend.models.Campaign;
import com.backend.models.INSTAPOSTSTATUS;
import com.backend.models.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InstaPostDto {
    private String instaPostId;
    private String postUrl;
    private String productUniqueCode;
    private Date date;
    private Double cashback;
    private INSTAPOSTSTATUS STATUS;
    private String description;
    
    private User user;  
    private Campaign campaign; 
}
