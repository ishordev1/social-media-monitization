package com.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoadMoney {
	@Id
private String loadMoneyId;
private Double amount;
private String bank;
private String paymentMode;

@ManyToOne
@JoinColumn(name = "user_Id")
private User user;
}
