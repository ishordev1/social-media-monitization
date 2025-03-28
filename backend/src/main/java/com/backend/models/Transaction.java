package com.backend.models;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Transaction {
	@Id
	private String TransactionId;
	@NotNull(message = "amount is required!..........")
	private Double amount;
	@NotBlank(message = "bank Name is required!..........")
	private String bank;
	private String paymentMode;
	private Date date;

	@ManyToOne
	@JoinColumn(name = "user_Id")
	private User user;

	@Enumerated(EnumType.STRING)
	private TRANSACTIONTYPE transactionType;
}
