package com.lovtter.dg.repository;

import com.lovtter.dg.domain.DgCategory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by pengx on 3/4/2016.
 */

@Repository
public interface DgCategoryRepository extends CrudRepository<DgCategory, Long> {
  DgCategory findById(Long id);
}