package com.lovtter.dg.service;

import com.lovtter.dg.domain.DgGood;

import java.util.List;

/**
 * Created by zhiweic on 5/17/2016.
 */
public interface DgGoodService {
  Iterable<DgGood> findAll();
  DgGood getDgGoodById(Long id);
  void delete(Long id);
  void updateDgGood(Long id, DgGood dgGood);
  void create(DgGood dgGood);
  List<DgGood> findByBrand(String brand);
  List<DgGood> findByCategory(String category);
}
