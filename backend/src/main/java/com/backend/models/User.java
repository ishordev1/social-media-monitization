package com.backend.models;


import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;

import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
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
	private String email;
	private String password;
	private String imgName;
	private String instaUsername;
	@Enumerated(EnumType.STRING)
	private UserStatus status;
	@Enumerated(EnumType.STRING)
    private Role role;
    private Boolean active;
//    private double instaScore;
	
}


