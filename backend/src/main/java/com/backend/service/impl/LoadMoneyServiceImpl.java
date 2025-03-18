package com.backend.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dto.LoadMoneyDto;
import com.backend.exception.ResourceNotFoundException;
import com.backend.models.BalanceInfo;
import com.backend.models.LoadMoney;
import com.backend.models.TRANSACTIONTYPE;
import com.backend.models.User;
import com.backend.repository.BalanceInfoRepository;
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
    private BalanceInfoRepository balanceInfoRepository;

    @Autowired
    private ModelMapper modelMapper; 
    
    @Override
    public LoadMoneyDto addMoney(LoadMoneyDto loadMoneyDto, String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        LoadMoney loadMoney = modelMapper.map(loadMoneyDto, LoadMoney.class);
        loadMoney.setLoadMoneyId(UUID.randomUUID().toString());
        loadMoney.setUser(user);
        loadMoney.setDate(new Date());
        loadMoney.setTransactionType(TRANSACTIONTYPE.CREDIT);
        // Save LoadMoney transaction
        LoadMoney savedTransaction = loadMoneyRepository.save(loadMoney);

        // Find BalanceInfo by user
        Optional<BalanceInfo> optionalBalance = balanceInfoRepository.findByUser_UserId(userId);
        
        BalanceInfo balanceInfo;
        if (optionalBalance.isPresent()) {
            // ✅ If balance info exists, update total balance
            balanceInfo = optionalBalance.get();
            balanceInfo.setTotalBalance(balanceInfo.getTotalBalance() + savedTransaction.getAmount());
        } else {
            // ✅ If balance info doesn't exist, create a new one
            balanceInfo = new BalanceInfo();
            balanceInfo.setBalanceInfoId(UUID.randomUUID().toString());
            balanceInfo.setUser(user);
            balanceInfo.setTotalBalance(savedTransaction.getAmount());
            balanceInfo.setSpendBalance(0.0);
        }
        
        // Save or update balance info
        balanceInfoRepository.save(balanceInfo);

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
    
    
    public LoadMoneyDto debitMoney(LoadMoneyDto loadMoneyDto, String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        // Find BalanceInfo by user
        BalanceInfo balanceInfo = balanceInfoRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Balance information not found for user ID: " + userId));

        // Check if the user has enough balance
        if (balanceInfo.getTotalBalance() < loadMoneyDto.getAmount()) {
            throw new IllegalArgumentException("Insufficient balance.");
        }

        // Deduct money from the user's balance
        balanceInfo.setTotalBalance(balanceInfo.getTotalBalance() - loadMoneyDto.getAmount());
        balanceInfo.setSpendBalance(balanceInfo.getSpendBalance() + loadMoneyDto.getAmount());

        // Save the updated balance
        balanceInfoRepository.save(balanceInfo);

        // Save the debit transaction
        LoadMoney loadMoney = modelMapper.map(loadMoneyDto, LoadMoney.class);
        loadMoney.setLoadMoneyId(UUID.randomUUID().toString());
        loadMoney.setUser(user);
        loadMoney.setDate(new Date());
        loadMoney.setAmount(-loadMoneyDto.getAmount()); // Storing as negative value for debit
        loadMoney.setTransactionType(TRANSACTIONTYPE.DEBIT);
        LoadMoney savedTransaction = loadMoneyRepository.save(loadMoney);

        return modelMapper.map(savedTransaction, LoadMoneyDto.class);
    }

    
}
