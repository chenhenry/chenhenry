package com.lovtter.dg.repository;

import com.lovtter.dg.domain.DgGood;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by pengx on 3/4/2016.
 */

@Repository
public interface DgGoodRepository extends CrudRepository<DgGood, Long> {
  DgGood findById(Long id);
}