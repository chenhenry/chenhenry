package com.moodys.atlas.storage.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "DATA_ASSET_FIELD")
public class DataAssetField {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id_data_asset_field")
  @JsonIgnore
  private long id;

  @Column(name = "index")
  private int index;

  @Column(name = "data_type")
  private String type;

  @Column(name = "name")
  private String name;

  @Column(name="nullable")
  private boolean nullable;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_data_asset", updatable = false, insertable = true, nullable = false)
  @JsonIgnore
  private DataAsset dataAsset;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getIndex() {
    return index;
  }

  public void setIndex(int index) {
    this.index = index;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public DataAsset getDataAsset() {
    return dataAsset;
  }

  public void setDataAsset(DataAsset dataAsset) {
    this.dataAsset = dataAsset;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public boolean isNullable() {
    return nullable;
  }

  public void setNullable(boolean nullable) {
    this.nullable = nullable;
  }
}
