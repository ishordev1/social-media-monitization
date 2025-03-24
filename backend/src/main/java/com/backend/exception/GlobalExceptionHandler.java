package com.backend.exception;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.backend.dto.ApiResponse;



@RestControllerAdvice
public class GlobalExceptionHandler {
	 @ExceptionHandler(ResourceNotFoundException.class)
	    public ResponseEntity<ApiResponse> resourceNotFoundExceptionHandler(ResourceNotFoundException ex){
	         
	          ApiResponse responseMessage =  ApiResponse.builder().message(ex.getMessage()).status(true).build();
	          return new ResponseEntity<>(responseMessage,HttpStatus.NOT_FOUND);
	    }


	    //MethodArgumentNotValidException
	    @ExceptionHandler(MethodArgumentNotValidException.class)
	    public ResponseEntity<Map<String,Object>> handlerMethodArgumentNotValidException(MethodArgumentNotValidException ex){
	              List<ObjectError> allErrors =  ex.getBindingResult().getAllErrors();
	              Map<String,Object> response = new HashMap<>();
	              allErrors.stream().forEach(ObjectError ->{
	                      String message = ObjectError.getDefaultMessage();
	                      String feild = ((FieldError)ObjectError).getField();
	                      response.put(feild,message);
	              });
	              return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
	    }
}
