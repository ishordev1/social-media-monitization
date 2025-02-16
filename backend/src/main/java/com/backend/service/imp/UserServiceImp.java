package com.backend.service.imp;

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
public class UserServiceImp implements UserService {
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDto createUser(UserDto userDto) {
		String userId=UUID.randomUUID().toString();
		userDto.setUserId(userId);
		User user = this.modelMapper.map(userDto, User.class);
		User u = this.userRepository.save(user);
		return this.modelMapper.map(u, UserDto.class);
	}

	@Override
	public UserDto updateUser(String userId, UserDto userDto) {
		this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("user not found in this email:" + userId));
		User u = this.modelMapper.map(userDto, User.class);
		User user1 = this.userRepository.save(u);
		return this.modelMapper.map(user1, UserDto.class);
	}

	@Override
	public Boolean deleteUser(String userId) {
		
		User user = this.userRepository.findById(userId).orElseThrow(()->new ResourceNotFoundException("user not found in this email:" + userId));
		this.userRepository.delete(user);
		return true;
	}

	@Override
	public List<UserDto> getAllUser() {
		List<User> user=this.userRepository.findAll();
		List<UserDto> userDtoList=user.stream().map(u->this.modelMapper.map(u, UserDto.class)).collect(Collectors.toList());
		return userDtoList;
	}

	@Override
	public UserDto getUserByEmail(String email) {
		User user = this.userRepository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User not found in this email:"+email));
		return this.modelMapper.map(user, UserDto.class);
	}

}
