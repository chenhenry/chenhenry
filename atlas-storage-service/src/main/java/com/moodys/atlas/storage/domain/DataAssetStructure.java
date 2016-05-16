package com.moodys.atlas.storage.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "DATA_ASSET_STRUCTURE")
public class DataAssetStructure {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id_data_asset_structure")
  private Long id;

  @OneToOne(mappedBy = "structure", fetch = FetchType.LAZY)
  @JsonIgnore
  private DataAsset dataAsset;

  @Column(name = "delimiter")
  private String delimiter;

  @Column(name = "header")
  private int header;

  @Column(name = "quote")
  private String quote;

  @Column(name = "escape")
  private String escape;

  @Column(name = "charset")
  private String charset;

  @Column(name = "comment")
  private Boolean comment;

  @Column(name = "null_value")
  private String nullValue;

  @Column(name = "date_format")
  private String dateFormat;

  @Column(name = "decimal_separator")
  private String decimalSeparator;

  @Column(name = "record_delimiter")
  private String recordDelimiter;

  @Column(name = "value_delimiter")
  private String valueDelimiter;

  public String getDelimiter() {
    return delimiter;
  }

  public void setDelimiter(String delimiter) {
    this.delimiter = delimiter;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public int getHeader() {
    return header;
  }

  public void setHeader(int header) {
    this.header = header;
  }

  public String getQuote() {
    return quote;
  }

  public void setQuote(String quote) {
    this.quote = quote;
  }

  public String getEscape() {
    return escape;
  }

  public void setEscape(String escape) {
    this.escape = escape;
  }

  public String getCharset() {
    return charset;
  }

  public void setCharset(String charset) {
    this.charset = charset;
  }

  public Boolean getComment() {
    return comment;
  }

  public void setComment(Boolean comment) {
    this.comment = comment;
  }

  public String getNullValue() {
    return nullValue;
  }

  public void setNullValue(String nullValue) {
    this.nullValue = nullValue;
  }

  public String getDateFormat() {
    return dateFormat;
  }

  public void setDateFormat(String dateFormat) {
    this.dateFormat = dateFormat;
  }

  public String getDecimalSeparator() {
    return decimalSeparator;
  }

  public void setDecimalSeparator(String decimalSeparator) {
    this.decimalSeparator = decimalSeparator;
  }

  public String getRecordDelimiter() {
    return recordDelimiter;
  }

  public void setRecordDelimiter(String recordDelimiter) {
    this.recordDelimiter = recordDelimiter;
  }

  public String getValueDelimiter() {
    return valueDelimiter;
  }

  public void setValueDelimiter(String valueDelimiter) {
    this.valueDelimiter = valueDelimiter;
  }

  public DataAsset getDataAsset() {
    return dataAsset;
  }

  public void setDataAsset(DataAsset dataAsset) {
    this.dataAsset = dataAsset;
  }
}