package com.lovtter.dg.service;

import com.lovtter.dg.domain.DgCategory;

/**
 * Created by zhiweic on 5/17/2016.
 */
public interface DgCategoryService {
  Iterable<DgCategory> findAll();
  DgCategory getCategoryById(Long id);
  void delete(Long id);
  void updateCategory(Long id, DgCategory dgCategory);
  void create(DgCategory dgCategory);
}
