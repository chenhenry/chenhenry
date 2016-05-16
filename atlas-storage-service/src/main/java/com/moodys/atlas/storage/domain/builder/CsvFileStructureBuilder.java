package com.moodys.atlas.storage.domain.builder;


import com.moodys.atlas.common.datamodel.api.CsvFileStructure;

public class CsvFileStructureBuilder extends EntityBuilder<CsvFileStructure> {

  public CsvFileStructureBuilder() {
    entity = new CsvFileStructure();
  }

  public CsvFileStructureBuilder fieldSeparator(String fieldSeparator) {
    entity.setFieldSeparator(fieldSeparator);
    return this;
  }

  public CsvFileStructureBuilder valueDelimiter(String valueDelimiter) {
    entity.setValueDelimiter(valueDelimiter);
    return this;
  }

  public CsvFileStructureBuilder recordDelimiter(String recordDelimiter) {
    entity.setRecordDelimiter(recordDelimiter);
    return this;
  }

  public CsvFileStructureBuilder decimalSeparator(String decimalSeparator) {
    entity.setDecimalSeparator(decimalSeparator);
    return this;
  }

  public CsvFileStructureBuilder dateFormat(String dateFormat) {
    entity.setDateFormat(dateFormat);
    return this;
  }

  public CsvFileStructureBuilder hasHeaders(boolean hasHeaders) {
    entity.setHasHeaders(hasHeaders);
    return this;
  }
}
