package com.backend.service.impl;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dto.UserDto;
import com.backend.exception.ResourceNotFoundException;
import com.backend.models.User;
import com.backend.repository.UserRepository;
import com.backend.service.UserService;

@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    private ModelMapper modelMapper;
    
    @Autowired
    private UserRepository userRepository;

    // Create User
    @Override
    public UserDto createUser(UserDto userDto) {
        String userId = UUID.randomUUID().toString();
        userDto.setUserId(userId);
        
        User user = this.modelMapper.map(userDto, User.class);
        User savedUser = this.userRepository.save(user);
        
        return this.modelMapper.map(savedUser, UserDto.class);
    }

    // Update User by Email
    @Override
    public UserDto updateUser(String email, UserDto userDto) {
        User existingUser = this.userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        // Ensure the same user ID is used
        userDto.setUserId(existingUser.getUserId());

        // Map the updated fields from DTO to the existing entity
        User updatedUser = this.modelMapper.map(userDto, User.class);
        User savedUser = this.userRepository.save(updatedUser);
        
        return this.modelMapper.map(savedUser, UserDto.class);
    }

    // Delete User by userId
    @Override
    public Boolean deleteUser(String userId) {
        User user = this.userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with userId: " + userId));

        this.userRepository.delete(user);
        return true;
    }

    // Get All Users
    @Override
    public List<UserDto> getAllUser() {
        List<User> users = this.userRepository.findAll();
        
        return users.stream()
                .map(user -> this.modelMapper.map(user, UserDto.class))
                .collect(Collectors.toList());
    }

    // Get User by Email
    @Override
    public UserDto getUserByEmail(String email) {
        User user = this.userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        return this.modelMapper.map(user, UserDto.class);
    }
}
