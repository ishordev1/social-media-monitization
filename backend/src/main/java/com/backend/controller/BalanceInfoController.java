package com.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.BalanceInfoDto;
import com.backend.service.BalanceInfoService;

@RestController
@RequestMapping("/api/balanceinfo")
public class BalanceInfoController {
	@Autowired
	private BalanceInfoService balanceInfoService;

	@GetMapping("/{userId}")
	public ResponseEntity<BalanceInfoDto> getBalance(@PathVariable String userId) {
		BalanceInfoDto balanceInfo = this.balanceInfoService.getBalanceByUserId(userId);
		return new ResponseEntity<BalanceInfoDto>(balanceInfo, HttpStatus.OK);
	}
	
}
