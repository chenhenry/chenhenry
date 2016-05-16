package com.moodys.atlas.storage.domain.builder;

import com.moodys.atlas.storage.domain.*;

import java.util.Date;
import java.util.List;

public class DataAssetBuilder extends EntityBuilder<DataAsset> {

  public DataAssetBuilder() {
    this.entity = new DataAsset();
  }

  public DataAssetBuilder name(String name) {
    entity.setName(name);
    return this;
  }

  public DataAssetBuilder sourceName(String sourceName) {
    entity.setSourceName(sourceName);
    return this;
  }

  public DataAssetBuilder type(DataAssetType type) {
    entity.setType(type);
    return this;
  }

  public DataAssetBuilder creator(String creator) {
    entity.setCreator(creator);
    return this;
  }

  public DataAssetBuilder createTime(Date createTime) {
    entity.setCreateTime(createTime);
    return this;
  }

  public DataAssetBuilder description(String description) {
    entity.setDescription(description);
    return this;
  }

  public DataAssetBuilder updateBy(String updateBy) {
    entity.setUpdateBy(updateBy);
    return this;
  }

  public DataAssetBuilder updateTime(Date updateTime) {
    entity.setUpdateTime(updateTime);
    return this;
  }

  public DataAssetBuilder fields(List<DataAssetField> fields) {
    entity.setFields(fields);
    return this;
  }

  public DataAssetBuilder structure(DataAssetStructure structure) {
    entity.setStructure(structure);
    return this;
  }

  public DataAssetBuilder links(List<DataAssetLink> links) {
    entity.setLinks(links);
    return this;
  }
}
