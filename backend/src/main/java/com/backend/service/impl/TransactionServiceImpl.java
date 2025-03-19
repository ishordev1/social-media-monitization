package com.backend.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dto.TransactionDto;
import com.backend.exception.ResourceNotFoundException;
import com.backend.models.BalanceInfo;
import com.backend.models.Transaction;
import com.backend.models.TRANSACTIONTYPE;
import com.backend.models.User;
import com.backend.repository.BalanceInfoRepository;
import com.backend.repository.TransactionRepository;
import com.backend.repository.UserRepository;
import com.backend.service.TransactionService;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private BalanceInfoRepository balanceInfoRepository;

    @Autowired
    private ModelMapper modelMapper; 
    
    @Override
    public TransactionDto addMoney(TransactionDto loadMoneyDto, String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        Transaction loadMoney = modelMapper.map(loadMoneyDto, Transaction.class);
        loadMoney.setTransactionId(UUID.randomUUID().toString());
        loadMoney.setUser(user);
        loadMoney.setDate(new Date());
        loadMoney.setTransactionType(TRANSACTIONTYPE.CREDIT);
        // Save LoadMoney transaction
        Transaction savedTransaction = transactionRepository.save(loadMoney);

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

        return modelMapper.map(savedTransaction, TransactionDto.class);
    }


    @Override
    public List<TransactionDto> getAllTransactionsByUser(String userId) {
        List<Transaction> transactions = transactionRepository.findByUserUserId(userId);
        return transactions.stream()
                .map(transaction -> modelMapper.map(transaction, TransactionDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteTransaction(String loadMoneyId) {
        Transaction loadMoney = this.transactionRepository.findById(loadMoneyId) .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with ID: " + loadMoneyId));
        transactionRepository.delete(loadMoney);
    }
    
    @Override
    public TransactionDto debitMoney(TransactionDto loadMoneyDto, String userId) {
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
        Transaction loadMoney = modelMapper.map(loadMoneyDto, Transaction.class);
        loadMoney.setTransactionId(UUID.randomUUID().toString());
        loadMoney.setUser(user);
        loadMoney.setDate(new Date());
        loadMoney.setAmount(-loadMoneyDto.getAmount()); // Storing as negative value for debit
        loadMoney.setTransactionType(TRANSACTIONTYPE.DEBIT);
        Transaction savedTransaction = transactionRepository.save(loadMoney);

        return modelMapper.map(savedTransaction, TransactionDto.class);
    }


	@Override
	public List<TransactionDto> getTypeTransactionsByUser(String userId,TRANSACTIONTYPE type) {
	List<Transaction> transactionList = this.transactionRepository.findByUserUserIdAndTransactionType(userId, type);
	return  transactionList.stream().map(transaction->this.modelMapper.map(transaction, TransactionDto.class)).collect(Collectors.toList());
	}





    
}
