package com.backend.models;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Campaign {
	@Id
private String campaignId;
	@NotBlank(message = "Campaign title is required!........")
private String title;
	@NotNull(message = "Campaign amount is required!........")
private Double amount;
private String campaignImgName;
@Column(length = 100000) 
private String description;
private Date createdDate;
private Double distributeAmount;
private Double RemainingAmount;
@Enumerated(EnumType.STRING)
private CAMPAIGNSTATUS status;
@ManyToOne
@JoinColumn(name = "user_id")
private User user;
//here is not using cascade so child is not delete, if we want to delete campaign
//then first make child null in campaign then delete this campaign
@OneToMany(mappedBy = "campaign",cascade = CascadeType.REMOVE)
@JsonIgnore 
private List<InstaPost> posts; 

}
