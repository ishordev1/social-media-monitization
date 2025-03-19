package com.backend.models;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InstaPost {
	@Id
	private String instaPostId;
	private String postUrl;
	private String productUniqueCode;
	private Date date;
	private Double cashback;
	private String description;
	private INSTAPOSTSTATUS STATUS;
	@ManyToOne
	@JoinColumn(name = "user_Id")
	private User user;
	
	@ManyToOne
    @JoinColumn(name="campaign_id", nullable = true) // Allow NULL values
    private Campaign campaign; // When campaign is deleted, this field becomes NULL
}
