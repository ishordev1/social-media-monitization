package com.backend.models;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
private String title;
private Double amount;
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
@OneToMany(mappedBy = "campaign")
@JsonIgnore 
private List<InstaPost> posts; 

}
