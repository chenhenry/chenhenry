package com.moodys.atlas.storage.domain.builder;

import com.moodys.atlas.storage.domain.DataAsset;
import com.moodys.atlas.storage.domain.DataAssetLink;
import com.moodys.atlas.storage.domain.DataAssetLinkDataSetComp;
import com.moodys.atlas.storage.domain.DataAssetLinkSource;

import java.util.Date;


public class DataAssetLinkBuilder extends EntityBuilder<DataAssetLink> {

  public DataAssetLinkBuilder() {
    entity = new DataAssetLink();
  }

  public DataAssetLinkBuilder dataSetComp(DataAssetLinkDataSetComp dataSetComp) {
    entity.setDataSetComp(dataSetComp);
    return this;
  }

  public DataAssetLinkBuilder dataAsset(DataAsset dataAsset) {
    entity.setDataAsset(dataAsset);
    return this;
  }

  public DataAssetLinkBuilder source(DataAssetLinkSource source) {
    entity.setSource(source);
    return this;
  }

  public DataAssetLinkBuilder description(String description) {
    entity.setDescription(description);
    return this;
  }

  public DataAssetLinkBuilder creator(String creator) {
    entity.setCreator(creator);
    return this;
  }

  public DataAssetLinkBuilder createTime(Date createTime) {
    entity.setCreateTime(createTime);
    return this;
  }

}
