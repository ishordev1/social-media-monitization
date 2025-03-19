package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.models.TRANSACTIONTYPE;
import com.backend.models.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, String> {
	 List<Transaction> findByUserUserId(String userId);
	 List<Transaction> findByUserUserIdAndTransactionType(String UserId,TRANSACTIONTYPE type);
	 
}
