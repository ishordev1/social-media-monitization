package com.backend.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BalanceInfoDto {
    private String balanceInfoId;
    private Double totalBalance;
    private Double spendBalance;
    private UserDto user; 
    private List<TransactionDto> loadMoneyTransactions;
}
