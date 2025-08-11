package com.backend.exception;

public class AlreadyExistException extends  RuntimeException{
public AlreadyExistException() {
	super("Already exist");
}

public AlreadyExistException(String message) {
	super(message);
}
}
