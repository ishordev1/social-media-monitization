package com.backend.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.SignatureAlgorithm;
import javax.crypto.SecretKey;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class JwtHelper {

    // Token validity for 5 hours (in milliseconds)
    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60 * 1000;

    // Secret key for signing JWT
    private final SecretKey secretKey = Keys.hmacShaKeyFor(
            "afafasfafafasfasfasfafacasdasfasxASFACASDFACASDFASFASFDAFASFASDAADSCSDFADCVSGCFVADXCcadwavfsfarvf"
                    .getBytes());




    // Retrieve username from JWT token
    public String getUsernameFromToken(String token) {
        return (String) getClaimFromToken(token, Claims.SUBJECT);
    }
    
    // Retrieve any claim from token
    public Object getClaimFromToken(String token, String claimKey) {
        return getAllClaimsFromToken(token).get(claimKey);
    }

    // Retrieve all claims
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    

    // Retrieve expiration date from JWT token
    public Date getExpirationDateFromToken(String token) {
        return getAllClaimsFromToken(token).getExpiration();
    }

    // Check if the token has expired
    private Boolean isTokenExpired(String token) {
        return getExpirationDateFromToken(token).before(new Date());
    }

    // Generate token for user
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return doGenerateToken(claims, userDetails.getUsername());
    }

    // Create JWT token
    private String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
                .signWith(secretKey, SignatureAlgorithm.HS512)
                .compact();
    }

    // Validate token
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
    
    
    
    
    
    
//    
//    SecretKey testKey=Keys.hmacShaKeyFor("jljkkkljnkjnjbn bvhjhjoikijkjiukfdkhkjshgkhdskghfkhjg".getBytes());
//    
//    String generateTokenTest(UserDetails userDetails) {
//    	return Jwts.builder().setSubject(userDetails.getUsername())
//    			.setIssuedAt(new Date(System.currentTimeMillis()))
//    			.setExpiration(new Date(System.currentTimeMillis()+5*60*50))
//    			.signWith(secretKey, SignatureAlgorithm.HS512)
//    			.compact();
//    }
//    
//    String getNameFromToken(String token) {
//    	return Jwts.parserBuilder().setSigningKey(secretKey).build()
//    			.parseClaimsJws(token).getBody().getSubject();
//    }
//    
//    boolean validateTokenTest(String token,UserDetails userDetails) {
//    	if(getNameFromToken(token).equals(userDetails.getUsername())) {
//    		if(Jwts.parserBuilder().setSigningKey(secretKey).build()
//		.parseClaimsJws(token).getBody().getExpiration().before(new Date())) {
//    			return true;
//    		}
//    	}
//    	return false;
//    }
    
    
    
    
}
