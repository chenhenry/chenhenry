package com.lovtter.dg.service;

import com.lovtter.dg.domain.DgClient;

/**
 * Created by zhiweic on 5/17/2016.
 */
public interface DgClientService {
  Iterable<DgClient> findAll();
  DgClient getClientById(Long id);
  void delete(Long id);
  void updateDgClient(Long id, DgClient dgClient);
  void create(DgClient dgClient);
}
