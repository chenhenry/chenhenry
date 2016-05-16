package com.moodys.atlas.storage.repository;

import com.moodys.atlas.storage.domain.DataAsset;
import com.moodys.atlas.storage.domain.DataAssetType;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by chenzi on 3/3/2016.
 */

@Repository
public interface DataAssetRepository extends CrudRepository<DataAsset, Long> {
  DataAsset findBySourceNameAndName(String sourceName, String assetName);

  void deleteBySourceNameAndName(String sourceName, String assetName);

  @Modifying
  @Query("delete from DataAsset da where da.sourceName = :sourceName")
  void deleteBySourceName(@Param("sourceName") String sourceName);

  void delete(Long entityId);

  @Modifying
  @Query("delete from DataAssetField daf where daf.dataAsset in (select da.id from DataAsset da where da.sourceName = :sourceName)")
  void deleteDataAssetFieldsBySourceName(@Param("sourceName") String sourceName);

  List<DataAsset> findBySourceNameOrderBySourceNameAsc(String sourceName);

  List<DataAsset> findBySourceNameAndTypeOrderBySourceNameAsc(String sourceName, DataAssetType type);


  // This is much faster but I can't seem to map it correctly to produce the json
  @Query("select da.id as id_data_asset, count(dal.id) from DataAssetLink dal right join dal.dataAsset da where da.sourceName = :sourceName group by da.id")
  List<DataAsset> foo(@Param("sourceName") String sourceName);

}
