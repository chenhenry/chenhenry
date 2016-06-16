package com.lovtter.dg.service;

import com.lovtter.dg.domain.DgBrand;

/**
 * Created by zhiweic on 5/17/2016.
 */
public interface DgBrandService {
  Iterable<DgBrand> findAll();
  DgBrand getBrandById(Long id);
  void delete(Long id);
  void updateDgBrand(Long id, DgBrand dgBrand);
  void create(DgBrand dgBrand);
}
