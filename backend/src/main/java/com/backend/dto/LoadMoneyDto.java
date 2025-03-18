package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoadMoneyDto {
    private String loadMoneyId;
    private Double amount;
    private String bank;
    private String paymentMode;
    private UserDto user; 
}
