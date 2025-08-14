package com.backend.service;

import java.util.List;

import com.backend.dto.UserDto;
import com.backend.models.Role;

public interface UserService {
public UserDto createUser(UserDto userDto);
public UserDto updateUser(String email,UserDto userDto);
public Boolean deleteUser(String userId);
public List<UserDto> getAllUser();
public UserDto getUserByEmail(String email);
public List<UserDto> getAllUserByRoleAndStatus(String role,String status);
public List<UserDto> searchUserByRoleAndName(String role,String name);
}
