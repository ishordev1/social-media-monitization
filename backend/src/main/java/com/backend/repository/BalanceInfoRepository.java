package com.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.models.BalanceInfo;

public interface BalanceInfoRepository extends JpaRepository<BalanceInfo, String>{
	 Optional<BalanceInfo> findByUser_UserId(String userId);
}
