package com.moodys.atlas.storage.domain.builder;

import com.moodys.atlas.storage.domain.DataAsset;
import com.moodys.atlas.storage.domain.DataAssetField;


public class DataAssetFieldBuilder extends EntityBuilder<DataAssetField> {

  public DataAssetFieldBuilder() {
    entity = new DataAssetField();
  }

  public DataAssetFieldBuilder index(int index) {
    entity.setIndex(index);
    return this;
  }

  public DataAssetFieldBuilder type(String type) {
    entity.setType(type);
    return this;
  }

  public DataAssetFieldBuilder name(String name) {
    entity.setName(name);
    return this;
  }

  public DataAssetFieldBuilder nullable(boolean nullable) {
    entity.setNullable(nullable);
    return this;
  }

  public DataAssetFieldBuilder dataAsset(DataAsset dataAsset) {
    entity.setDataAsset(dataAsset);
    return this;
  }

}
