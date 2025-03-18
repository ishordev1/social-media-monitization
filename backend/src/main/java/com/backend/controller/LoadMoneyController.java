package com.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.dto.LoadMoneyDto;
import com.backend.service.LoadMoneyService;

import java.util.List;

@RestController
@RequestMapping("/api/load-money")
public class LoadMoneyController {

    @Autowired
    private LoadMoneyService loadMoneyService;

    // ✅ Add money to the user's account
    @PostMapping("/{userId}")
    public ResponseEntity<LoadMoneyDto> addMoney(@RequestBody LoadMoneyDto loadMoneyDto, @PathVariable String userId) {
        LoadMoneyDto savedTransaction = loadMoneyService.addMoney(loadMoneyDto, userId);
        return new ResponseEntity<>(savedTransaction, HttpStatus.CREATED);
    }

    // ✅ Get all transactions for a specific user
    @GetMapping("/{userId}")
    public ResponseEntity<List<LoadMoneyDto>> getAllTransactionsByUser(@PathVariable String userId) {
        List<LoadMoneyDto> transactions = loadMoneyService.getAllTransactionsByUser(userId);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    // ✅ Delete a transaction by ID
    @DeleteMapping("/{loadMoneyId}")
    public ResponseEntity<String> deleteTransaction(@PathVariable String loadMoneyId) {
        loadMoneyService.deleteTransaction(loadMoneyId);
        return new ResponseEntity<>("Transaction deleted successfully!", HttpStatus.OK);
    }
}
