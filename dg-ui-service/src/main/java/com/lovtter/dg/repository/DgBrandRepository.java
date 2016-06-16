package com.lovtter.dg.repository;

import com.lovtter.dg.domain.DgBrand;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by pengx on 3/4/2016.
 */

@Repository
public interface DgBrandRepository extends CrudRepository<DgBrand, Long> {
  DgBrand findById(Long id);
}