package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.models.LoadMoney;

public interface LoadMoneyRepository extends JpaRepository<LoadMoney, String> {
	 List<LoadMoney> findByUserUserId(String userId);
}
