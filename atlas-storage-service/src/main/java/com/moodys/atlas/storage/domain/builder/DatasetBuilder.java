package com.moodys.atlas.storage.domain.builder;


import com.moodys.atlas.common.datamodel.api.Dataset;

public class DatasetBuilder extends EntityBuilder<Dataset> {

  public DatasetBuilder() {
    entity = new Dataset();
  }

  public DatasetBuilder name(String name) {
    entity.setName(name);
    return this;
  }

}
