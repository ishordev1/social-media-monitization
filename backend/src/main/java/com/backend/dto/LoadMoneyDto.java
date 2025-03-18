package com.backend.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoadMoneyDto {
    private String loadMoneyId;
    private Date date;
    private Double amount;
    private String bank;
    private String paymentMode;
    private UserDto user; 
}
