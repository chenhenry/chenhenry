package com.lovtter.dg.repository;

import com.lovtter.dg.domain.DgOrder;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by pengx on 3/4/2016.
 */

@Repository
public interface DgOrderRepository extends CrudRepository<DgOrder, Long> {
  DgOrder findById(Long id);
}