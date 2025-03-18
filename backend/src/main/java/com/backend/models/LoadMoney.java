package com.backend.models;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
private Date date;
@ManyToOne
@JoinColumn(name = "user_Id")
private User user;

@ManyToOne
@JoinColumn(name = "balance_info_id")
private BalanceInfo balanceInfo;
@Enumerated(EnumType.STRING)
private TRANSACTIONTYPE transactionType; 
}
