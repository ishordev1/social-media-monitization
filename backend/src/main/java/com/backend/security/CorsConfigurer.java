package com.backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class CorsConfigurer  implements WebMvcConfigurer{
	@Value("${FRONTEND_URL}")
	private String url;
	@Override
        public void addCorsMappings(CorsRegistry registry) {
	
            registry.addMapping("/**")   //to all endpoint allow
                    .allowedOrigins(url)
                    .allowedMethods("*")
                    .allowCredentials(true);  //we send somethings so it allow -> like (Header)
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
