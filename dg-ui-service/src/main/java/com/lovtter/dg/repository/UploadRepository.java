package com.lovtter.dg.repository;

import com.lovtter.dg.domain.Upload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * Created by GunduzB on 10/29/2015.
 */
@Repository
public interface UploadRepository extends JpaRepository<Upload, Integer> {

  Upload findOneByPathAndName(String path, String name);
}
