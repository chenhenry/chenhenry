package com.lovtter.dg.service;

import com.lovtter.dg.domain.DgOrder;

/**
 * Created by zhiweic on 5/17/2016.
 */
public interface DgOrderService {
  Iterable<DgOrder> findAll();
  DgOrder getOrderById(Long id);
  void delete(Long id);
  void updateDgClient(Long id, DgOrder dgOrder);
  void create(DgOrder dgOrder);
}
