package com.backend.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class CorsConfigurer  implements WebMvcConfigurer{
	@Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")   //to all endpoint allow
                    .allowedOrigins("http://localhost:5173")
                    .allowedMethods("*")
                    .allowCredentials(true);
        }
	
	

//	//this is use for frontend url allow 
//		@Bean
//	    public FilterRegistrationBean coresFilter() {
//	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//	        CorsConfiguration corsConfiguration = new CorsConfiguration();
//	        corsConfiguration.setAllowCredentials(true);
//	        corsConfiguration.addAllowedOriginPattern("*");
//	        corsConfiguration.addAllowedHeader("Authorization");
//	        corsConfiguration.addAllowedHeader("Content-Type");
//	        corsConfiguration.addAllowedHeader("Accept");
//	        corsConfiguration.addAllowedMethod("POST");
//	        corsConfiguration.addAllowedMethod("GET");
//	        corsConfiguration.addAllowedMethod("DELETE");
//	        corsConfiguration.addAllowedMethod("PUT");
//	        corsConfiguration.addAllowedMethod("OPTIONS");
//	        corsConfiguration.setMaxAge(3600L);
//
//	        source.registerCorsConfiguration("/**", corsConfiguration);
//	        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean(new CorsFilter(source));
//	        filterRegistrationBean.setOrder(-110);
//	        return filterRegistrationBean;
//	    }
		
    
}
