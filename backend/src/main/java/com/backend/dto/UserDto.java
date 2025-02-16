package com.backend.dto;

import java.util.HashSet;
import java.util.Set;

import com.backend.models.Role;

import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToMany;

public class UserDto {
	private String userId;
	private String name;
	private String email;
	private String password;
	private String active;
	private String imgName;
	private String instaUsername;
	private String verify;
    private Set<Role> roles = new HashSet<>();
}
