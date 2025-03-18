package com.backend.service.impl;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dto.LoadMoneyDto;
import com.backend.exception.ResourceNotFoundException;
import com.backend.models.LoadMoney;
import com.backend.models.User;
import com.backend.repository.LoadMoneyRepository;
import com.backend.repository.UserRepository;
import com.backend.service.LoadMoneyService;

@Service
public class LoadMoneyServiceImpl implements LoadMoneyService {

    @Autowired
    private LoadMoneyRepository loadMoneyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public LoadMoneyDto addMoney(LoadMoneyDto loadMoneyDto, String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        LoadMoney loadMoney = modelMapper.map(loadMoneyDto, LoadMoney.class);
        loadMoney.setLoadMoneyId(UUID.randomUUID().toString());
        loadMoney.setUser(user);

        LoadMoney savedTransaction = loadMoneyRepository.save(loadMoney);
        return modelMapper.map(savedTransaction, LoadMoneyDto.class);
    }

    @Override
    public List<LoadMoneyDto> getAllTransactionsByUser(String userId) {
        List<LoadMoney> transactions = loadMoneyRepository.findByUserUserId(userId);
        return transactions.stream()
                .map(transaction -> modelMapper.map(transaction, LoadMoneyDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteTransaction(String loadMoneyId) {
        LoadMoney loadMoney = this.loadMoneyRepository.findById(loadMoneyId) .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with ID: " + loadMoneyId));
        loadMoneyRepository.delete(loadMoney);
    }
}
