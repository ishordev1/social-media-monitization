package com.backend.service;

import java.util.List;

import com.backend.dto.LoadMoneyDto;

public interface LoadMoneyService {
    LoadMoneyDto addMoney(LoadMoneyDto loadMoneyDto, String userId);
    List<LoadMoneyDto> getAllTransactionsByUser(String userId);
    void deleteTransaction(String loadMoneyId);
}
