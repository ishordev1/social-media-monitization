package com.backend.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class BalanceInfo {
	@Id
private String balanceInfoId;
private Double totalBalance=0.0;
private Double spendBalance=0.0;
@OneToOne(cascade = CascadeType.ALL)
@JoinColumn(name = "user_Id")
private User user;

@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
private List<Transaction> loadMoneyTransactions;
}
