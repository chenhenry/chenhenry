package com.lovtter.dg.repository;

import com.lovtter.dg.domain.DgClient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by pengx on 3/4/2016.
 */

@Repository
public interface DgClientRepository extends CrudRepository<DgClient, Long> {
  DgClient findById(Long id);
}