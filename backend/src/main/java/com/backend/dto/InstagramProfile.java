package com.backend.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InstagramProfile {
 private String username;
 private String fullName;
 private String biography;
 private String profilePicUrl;
 private int followers;
 private int following;
 private int posts;
 private boolean isPrivate;
 private boolean isVerified;
 private List<InstagramPost> recentPosts;


}
