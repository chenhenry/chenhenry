package com.moodys.atlas.storage.domain.builder;

import com.moodys.atlas.storage.domain.DataAssetDataSource;


public class DataAssetDataSourceBuilder extends EntityBuilder<DataAssetDataSource> {

  public DataAssetDataSourceBuilder() {
    entity = new DataAssetDataSource();
  }

  public DataAssetDataSourceBuilder name(String name) {
    entity.setName(name);
    return this;
  }

  public DataAssetDataSourceBuilder type(String type) {
    entity.setType(type);
    return this;
  }

}
