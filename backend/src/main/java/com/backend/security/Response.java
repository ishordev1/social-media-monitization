package com.backend.security;


import com.backend.dto.UserDto;
import com.backend.models.User;

import lombok.Builder;
import lombok.Data;
@Data
@Builder
public class Response {
private String token;
private UserDto user;
}
