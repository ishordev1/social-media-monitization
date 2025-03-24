package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InstagramPost {
private String id;
private String shortcode;
private String caption;
private int likes;
private int comments;
private String imageUrl;
private long timestamp;

}