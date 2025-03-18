package com.backend.service.impl;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dto.BalanceInfoDto;
import com.backend.exception.ResourceNotFoundException;
import com.backend.models.BalanceInfo;
import com.backend.repository.BalanceInfoRepository;
import com.backend.service.BalanceInfoService;
import org.modelmapper.ModelMapper;

@Service
public class BalanceInfoServiceImpl implements BalanceInfoService {

    @Autowired
    private BalanceInfoRepository balanceInfoRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public BalanceInfoDto getBalanceByUserId(String userId) {
        BalanceInfo balanceInfo = balanceInfoRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Balance not found for user ID: " + userId));
        return modelMapper.map(balanceInfo, BalanceInfoDto.class);
    }

    @Override
    public BalanceInfoDto addBalance(BalanceInfoDto balanceInfoDto) {
        BalanceInfo balanceInfo = modelMapper.map(balanceInfoDto, BalanceInfo.class);
        BalanceInfo savedBalanceInfo = balanceInfoRepository.save(balanceInfo);
        return modelMapper.map(savedBalanceInfo, BalanceInfoDto.class);
    }

    @Override
    public BalanceInfoDto updateBalance(String balanceInfoId, BalanceInfoDto balanceInfoDto) {
        BalanceInfo existingBalance = balanceInfoRepository.findById(balanceInfoId)
                .orElseThrow(() -> new ResourceNotFoundException("Balance not found with ID: " + balanceInfoId));

        existingBalance.setTotalBalance(balanceInfoDto.getTotalBalance());
        existingBalance.setSpendBalance(balanceInfoDto.getSpendBalance());

        BalanceInfo updatedBalance = balanceInfoRepository.save(existingBalance);
        return modelMapper.map(updatedBalance, BalanceInfoDto.class);
    }

    @Override
    public void deleteBalance(String balanceInfoId) {
        BalanceInfo balanceInfo = balanceInfoRepository.findById(balanceInfoId)
                .orElseThrow(() -> new ResourceNotFoundException("Balance not found with ID: " + balanceInfoId));

        balanceInfoRepository.delete(balanceInfo);
    }
}
