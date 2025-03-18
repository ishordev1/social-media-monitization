package com.backend.service;

import com.backend.dto.BalanceInfoDto;

public interface BalanceInfoService {
    BalanceInfoDto getBalanceByUserId(String userId);
    BalanceInfoDto addBalance(BalanceInfoDto balanceInfoDto);
    BalanceInfoDto updateBalance(String balanceInfoId, BalanceInfoDto balanceInfoDto);
    void deleteBalance(String balanceInfoId);
}
