package com.backend.models;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
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
	@Column(unique = true,name = "Post is already exist!.......")
	@NotBlank(message ="post url is requires")
	private String postUrl;
	@Column(unique = true,name="product Code is already exist!....................")
	@NotBlank(message ="product code required!")
	private String productUniqueCode;
	private Date date;
	private Double cashback;
	private String description;
	private Boolean adminVisit=false;
	private INSTAPOSTSTATUS STATUS;
	@ManyToOne
	@JoinColumn(name = "user_Id")
	private User user;
	
	@ManyToOne
    @JoinColumn(name="campaign_id", nullable = true) 
    private Campaign campaign; 
}
