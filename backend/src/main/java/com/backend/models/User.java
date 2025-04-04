package com.backend.models;


import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;

import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
	@Id
	private String userId;
	private String name;
	@Column(unique = true,name="Email is already exist!...")
	private String email;
	@NotBlank(message = "password is required!.............")
	private String password;
	private String imgName;
	@NotBlank(message = "Instagram user id is required!.............")
	private String instaUsername;
	@Enumerated(EnumType.STRING)
	private UserStatus status;
	@Enumerated(EnumType.STRING)
    private Role role;
	private Date joinDate;
    private Boolean active;
    private double instaScore;
	
}


