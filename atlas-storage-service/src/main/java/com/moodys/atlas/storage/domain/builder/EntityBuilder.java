package com.moodys.atlas.storage.domain.builder;

/**
 * Created by chenzi on 3/17/2016.
 */
public abstract class EntityBuilder<T> {

  protected T entity;

  public T build() {
    return entity;
  }

}
