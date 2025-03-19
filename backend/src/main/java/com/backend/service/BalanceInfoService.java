package com.backend.service;

import java.util.List;

import com.backend.dto.BalanceInfoDto;
import com.backend.dto.TransactionDto;

public interface BalanceInfoService {
    BalanceInfoDto getBalanceByUserId(String userId);
    BalanceInfoDto addBalance(BalanceInfoDto balanceInfoDto);
    BalanceInfoDto updateBalance(String balanceInfoId, BalanceInfoDto balanceInfoDto);
    void deleteBalance(String balanceInfoId);
  
}
