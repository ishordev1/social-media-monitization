package com.backend.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.backend.models.Role;
import com.backend.models.UserStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDto {
	private String userId;
	private String name;
	private String email;
	private String password;
	private String imgName;
	private String instaUsername;
	private Date joinDate;
	private UserStatus status;
	private Role role;
	private Boolean active;
	 private double instaScore;

}
