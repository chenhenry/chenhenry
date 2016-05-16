package com.moodys.atlas.storage.exception;

/**
 * Created by chenzi on 3/21/2016.
 */
public class InvalidDataAssetFieldsException extends RuntimeException {
  public static enum ExceptionType {
    UNSPECIFIED, DATA_TYPE, INDEX_RANGE, FIELDS_NUMBER
  }

  private ExceptionType exceptionType;

  public InvalidDataAssetFieldsException(String message) {
    super(message);
    this.exceptionType = ExceptionType.UNSPECIFIED;
  }

  public InvalidDataAssetFieldsException(ExceptionType exceptionType, String message) {
    super(message);
    this.exceptionType = exceptionType;
  }

  public ExceptionType getExceptionType() {
    return exceptionType;
  }
}
