package com.moodys.atlas.storage.domain.builder;


import com.moodys.atlas.common.datamodel.api.DataType;
import com.moodys.atlas.common.datamodel.api.Field;

public class FieldBuilder extends EntityBuilder<Field> {

  public FieldBuilder() {
    entity = new Field();
  }

  public FieldBuilder dataType(DataType dataType) {
    entity.setDataType(dataType);
    return this;
  }

  public FieldBuilder nullable(boolean nullable) {
    entity.setNullable(nullable);
    return this;
  }

  public FieldBuilder order(Integer order) {
    entity.setOrder(order);
    return this;
  }

  public FieldBuilder name(String name) {
    entity.setName(name);
    return this;
  }

  public FieldBuilder description(String description) {
    entity.setDescription(description);
    return this;
  }
}
