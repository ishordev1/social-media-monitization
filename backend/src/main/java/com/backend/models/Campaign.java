package com.backend.models;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
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
private String campaignnId;
private String title;
private Double amount;
private String description;
private Date createdDate;
private Double distributeAmount;
private Double RemainingAmount;
@ManyToOne(cascade = CascadeType.REMOVE)
@JoinColumn(name = "user_id")
private User user;

@OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL, orphanRemoval = true)
private List<CampaignParticipation> participants;

}
