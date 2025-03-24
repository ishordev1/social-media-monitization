package com.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.backend.dto.TransactionDto;
import com.backend.models.TRANSACTIONTYPE;
import com.backend.service.TransactionService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/transaction")
@Tag(name="Bank transation", description="Create, Read, Delete, Update,")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // ✅ Add money to the user's account
    @PostMapping("/credit/{userId}")
    public ResponseEntity<TransactionDto> creditedMoney(@Valid @RequestBody TransactionDto loadMoneyDto, @PathVariable String userId) {
        TransactionDto savedTransaction = transactionService.addMoney(loadMoneyDto, userId);
        return new ResponseEntity<>(savedTransaction, HttpStatus.CREATED);
    }

    
    // ✅ debit money to the user's account
    @PostMapping("/debit/{userId}")
    public ResponseEntity<TransactionDto> debitedMoney(@RequestBody TransactionDto loadMoneyDto, @PathVariable String userId) {
        TransactionDto savedTransaction = transactionService.debitMoney(loadMoneyDto, userId);
        return new ResponseEntity<>(savedTransaction, HttpStatus.CREATED);
    }
    
    // ✅ Get all transactions for a specific user
    @GetMapping("/{userId}")
    public ResponseEntity<List<TransactionDto>> getAllTransactionsByUser(@PathVariable String userId) {
        List<TransactionDto> transactions = transactionService.getAllTransactionsByUser(userId);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    // ✅ Delete a transaction by ID
    @DeleteMapping("/{loadMoneyId}")
    public ResponseEntity<String> deleteTransaction(@PathVariable String loadMoneyId) {
    	transactionService.deleteTransaction(loadMoneyId);
        return new ResponseEntity<>("Transaction deleted successfully!", HttpStatus.OK);
    }
    
    @GetMapping("/{userId}/type/{type}")
    ResponseEntity<List<TransactionDto>> getTransactionType(@PathVariable String userId,@PathVariable TRANSACTIONTYPE type){
    	List<TransactionDto> transaction = this.transactionService.getTypeTransactionsByUser(userId, type);
    	return new ResponseEntity<List<TransactionDto>>(transaction,HttpStatus.OK);
    }
    
    
}
