package com.backend.service;

import java.util.List;

import com.backend.dto.UserDto;

public interface UserService {
public UserDto createUser(UserDto userDto);
public UserDto updateUser(String email,UserDto userDto);
public Boolean deleteUser(String userId);
public List<UserDto> getAllUser();
public UserDto getUserByEmail(String email);
}
