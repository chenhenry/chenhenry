package com.lovtter.dg.repository;

import com.lovtter.dg.domain.DgGood;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by pengx on 3/4/2016.
 */

@Repository
public interface DgGoodRepository extends CrudRepository<DgGood, Long> {
  DgGood findById(Long id);

  List<DgGood> findByBrand(String brand);

  List<DgGood> findByCategory(String category);
}