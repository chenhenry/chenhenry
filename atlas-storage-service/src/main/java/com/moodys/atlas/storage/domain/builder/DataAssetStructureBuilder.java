package com.moodys.atlas.storage.domain.builder;


import com.moodys.atlas.storage.domain.DataAssetStructure;

public class DataAssetStructureBuilder extends EntityBuilder<DataAssetStructure> {

  public DataAssetStructureBuilder() {
    entity = new DataAssetStructure();
  }

  public DataAssetStructureBuilder delimiter(String delimiter) {
    entity.setDelimiter(delimiter);
    return this;
  }

  public DataAssetStructureBuilder header(int header) {
    entity.setHeader(header);
    return this;
  }

  public DataAssetStructureBuilder quote(String quote) {
    entity.setQuote(quote);
    return this;
  }

  public DataAssetStructureBuilder escape(String escape) {
    entity.setEscape(escape);
    return this;
  }

  public DataAssetStructureBuilder charset(String charset) {
    entity.setCharset(charset);
    return this;
  }

  public DataAssetStructureBuilder comment(boolean hasComment) {
    entity.setComment(hasComment);
    return this;
  }

  public DataAssetStructureBuilder nullValue(String nullValue) {
    entity.setNullValue(nullValue);
    return this;
  }

  public DataAssetStructureBuilder dataFormat(String dateFormat) {
    entity.setDateFormat(dateFormat);
    return this;
  }

  public DataAssetStructureBuilder decimalSeparator(String decimalSeparator) {
    entity.setDecimalSeparator(decimalSeparator);
    return this;
  }

  public DataAssetStructureBuilder recordDelimiter(String recordDelimiter) {
    entity.setRecordDelimiter(recordDelimiter);
    return this;
  }

  public DataAssetStructureBuilder valueDelimiter(String valueDelimiter) {
    entity.setValueDelimiter(valueDelimiter);
    return this;
  }

}
