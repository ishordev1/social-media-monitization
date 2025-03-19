package com.backend.service;

import java.util.List;

import com.backend.dto.TransactionDto;
import com.backend.models.TRANSACTIONTYPE;

public interface TransactionService {
    TransactionDto addMoney(TransactionDto TransactionDto, String userId);
    void deleteTransaction(String TransactionId);
    TransactionDto debitMoney(TransactionDto TransactionDto, String userId);
    List<TransactionDto> getAllTransactionsByUser(String userId);
    List<TransactionDto> getTypeTransactionsByUser(String userId,TRANSACTIONTYPE type);
}
