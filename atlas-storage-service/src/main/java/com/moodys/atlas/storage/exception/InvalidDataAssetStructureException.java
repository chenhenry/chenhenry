package com.moodys.atlas.storage.exception;

import com.moodys.atlas.storage.domain.DataAssetStructure;

public class InvalidDataAssetStructureException extends RuntimeException {

  public static enum ExceptionTypes {
    UNSPECIFIED, FILE_FORMAT, HAS_HEADER, FIELD_SEPARATOR, DECIMAL_SEPARATOR,RECORD_DELIMITER, VALUE_DELIMITER, DATE_FORMAT
  }

  private ExceptionTypes exceptionType = ExceptionTypes.UNSPECIFIED;

  public InvalidDataAssetStructureException(String message) {
    super(message);
    this.exceptionType = ExceptionTypes.UNSPECIFIED;
  }

  public InvalidDataAssetStructureException(ExceptionTypes exceptionType, String message) {
    super(message);
    this.exceptionType = exceptionType;
  }

  public ExceptionTypes getExceptionType() {
    return exceptionType;
  }
}
