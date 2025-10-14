package com.backend.service.impl;

import java.lang.annotation.Annotation;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.dto.TransactionDto;
import com.backend.dto.UserDto;
import com.backend.exception.ResourceNotFoundException;
import com.backend.models.Role;
import com.backend.models.User;
import com.backend.models.UserStatus;
import com.backend.repository.UserRepository;
import com.backend.service.TransactionService;
import com.backend.service.UserService;

import jakarta.annotation.Resource;
import jakarta.annotation.Resource.AuthenticationType;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passeEncoder;
	@Autowired 
	private TransactionService transactionService;

	// Create User
	@Override
	public UserDto createUser(UserDto userDto) {
		String userId = UUID.randomUUID().toString();
		userDto.setUserId(userId);
		userDto.setPassword(this.passeEncoder.encode(userDto.getPassword()));
		if (this.userRepository.findByEmail(userDto.getEmail()).isPresent()) {
			throw new ResourceNotFoundException("user is already exist..");
		}
		if (userDto.getRole() == Role.CUSTOMER) {
			userDto.setStatus(UserStatus.PENDING);
		} else {
			userDto.setStatus(UserStatus.VERIFY);
		}
		userDto.setActive(true);
//		userDto.setImgName("defaultProfile.png");
		userDto.setJoinDate(new Date());
		User user = this.modelMapper.map(userDto, User.class);
		User savedUser = this.userRepository.save(user);
		if(savedUser.getRole().equals(Role.BRAND)) {
			TransactionDto transaction=new TransactionDto();
			transaction.setAmount(0.0);
			transaction.setBank("SMM");
			transaction.setPaymentMode("UPI");
			this.transactionService.addMoney(transaction, savedUser.getUserId());
		}
		return this.modelMapper.map(savedUser, UserDto.class);
	}

	// Update User by Email
	@Override
	public UserDto updateUser(String userId, UserDto userDto) {
		User existingUser = this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with this id: " + userId));

		existingUser.setName(userDto.getName());
		existingUser.setEmail(userDto.getEmail());
		existingUser.setInstaUsername(userDto.getInstaUsername());
		existingUser.setInstaScore(0);
		existingUser.setRole(userDto.getRole());
		existingUser.setImgName(userDto.getImgName());

		
		User savedUser = this.userRepository.save(existingUser);

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

		return users.stream().map(user -> this.modelMapper.map(user, UserDto.class)).collect(Collectors.toList());
	}

	// Get User by Email
	@Override
	public UserDto getUserByEmail(String email) {
		User user = this.userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

		return this.modelMapper.map(user, UserDto.class);
	}

	@Override
	public List<UserDto> getAllUserByRoleAndStatus(String role,String status) {
	
		Role r=Role.valueOf(role.toUpperCase());

	List<User> users=null;
	
		if(!status.equalsIgnoreCase("All")) {
			UserStatus userStatus=UserStatus.valueOf(status.toUpperCase());
			users=this.userRepository.findByRoleAndStatus(r,userStatus).orElseThrow(()-> new ResourceNotFoundException("user not Available."));
		}
		else {			
			users=this.userRepository.findByRole(r).orElseThrow(()-> new ResourceNotFoundException("user not Available."));
		}
		
		return users.stream().map(user-> this.modelMapper.map(user, UserDto.class)).collect(Collectors.toList());
	}

	@Override
	public List<UserDto> searchUserByRoleAndName(String role, String name) {
	Role r=Role.valueOf(role.toUpperCase());
	List<User> users=this.userRepository.findByRoleAndNameContaining(r, name).orElseThrow(()-> new ResourceNotFoundException("user not found"));
		
	
	return users.stream().map((user)->this.modelMapper.map(user, UserDto.class)).collect(Collectors.toList());
	}

}
