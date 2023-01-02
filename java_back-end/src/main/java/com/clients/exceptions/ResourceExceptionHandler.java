package com.clients.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;

@ControllerAdvice
public class ResourceExceptionHandler {

    @ExceptionHandler(ObjNotFoundException.class)
    public ResponseEntity<StandardError> objNotFound(
            ObjNotFoundException e,
            HttpServletRequest request){

        StandardError error = new StandardError();
        error.setTimestamp(LocalDateTime.now());
        error.setStatus(HttpStatus.NOT_FOUND.value());
        error.setError("Elemento não encontrado");
        error.setMessage(e.getMessage());
        error.setPath(request.getRequestURI());

        return ResponseEntity.status(HttpStatus.NOT_FOUND.value()).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationError> methodValidation(
            MethodArgumentNotValidException e,
            HttpServletRequest request) {

        System.out.println("MethodArgumentNotValidException");

        ValidationError error = new ValidationError();

        error.setTimestamp(LocalDateTime.now());
        error.setStatus(HttpStatus.BAD_REQUEST.value());
        error.setError("Erro de validação");
        error.setMessage("Erro na validação dos dados da operação");
        error.setPath(request.getRequestURI());

        for (int i = 0; i < e.getBindingResult().getFieldErrors().size(); i++ ) {

            String fieldName = e.getBindingResult().getFieldErrors().get(i).getField();
            String message = e.getBindingResult().getFieldErrors().get(i).getDefaultMessage();
            error.addError(fieldName, message);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
}
