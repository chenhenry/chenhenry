package com.moodys.atlas.storage.domain;

import com.moodys.atlas.common.datamodel.api.DataSource;

/**
 * Created by henry on 3/24/2016.
 */
public class DataAssetDataSource implements DataSource {
  private String name;
  private String type;
  private int dataAssetCount;

  @Override
  public String getType() {
    return this.type;
  }

  @Override
  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setType(String type) {
    this.type = type;
  }

  public int getDataAssetCount() {
    return dataAssetCount;
  }

  public void setDataAssetCount(int dataAssetCount) {
    this.dataAssetCount = dataAssetCount;
  }
}
