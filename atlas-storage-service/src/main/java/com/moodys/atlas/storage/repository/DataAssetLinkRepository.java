package com.moodys.atlas.storage.repository;

import com.moodys.atlas.storage.domain.DataAssetLink;
import com.moodys.atlas.storage.domain.DataAssetLinkDataSetComp;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by pengx on 3/4/2016.
 */

@Repository
public interface DataAssetLinkRepository extends CrudRepository<DataAssetLink, Long> {

  @Query("select link from DataAssetLink link where link.dataAsset.name = :assetName and link.dataSetComp = :dataSetComp ")
  DataAssetLink searchByAssetNameAndDataSetComp(@Param("assetName") String assetName, @Param("dataSetComp") DataAssetLinkDataSetComp dataSetComp);

  DataAssetLink findOneByDataSetComp(DataAssetLinkDataSetComp dataSet);

  @Modifying
  @Query("delete from DataAssetLink daf where daf.dataAsset in (select da.id from DataAsset da where da.sourceName = :sourceName)")
  void deleteDataAssetLinksBySourceName(@Param("sourceName") String sourceName);

  @Query("select link from DataAssetLink link where link.dataSetComp.sourceName = :sourceName and link.dataSetComp.workspace = :workspace ")
  List<DataAssetLink> findBySourceNameAndWorkSpace(@Param("sourceName")String sourceName, @Param("workspace")String workspace);

}