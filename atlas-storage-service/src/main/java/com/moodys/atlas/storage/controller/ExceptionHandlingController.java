package com.moodys.atlas.storage.controller;

import com.moodys.atlas.services.commons.springboot.ErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by chenzi on 3/9/2016.
 */
@ControllerAdvice
public class ExceptionHandlingController {

  private static Logger logger = LoggerFactory.getLogger(ExceptionHandlingController.class);

  @ExceptionHandler(Exception.class)
  @ResponseBody
  ResponseEntity<Object> handleAllRuntimeException(HttpServletRequest request, Exception ex) {
    logger.error(ex.getMessage(), ex);
    final HttpStatus status = getStatus(request, ex);
    return new ResponseEntity<>(new ErrorResponse(status.value(), status.getReasonPhrase(), ex.getMessage()), status);
  }

  private HttpStatus getStatus(HttpServletRequest request, Throwable ex) {
    final Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
    if (statusCode == null) {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return HttpStatus.valueOf(statusCode);
  }
}
