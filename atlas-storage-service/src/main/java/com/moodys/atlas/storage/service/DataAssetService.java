package com.moodys.atlas.storage.service;

import com.moodys.atlas.common.datamodel.api.Workspace;
import com.moodys.atlas.storage.domain.*;

import java.util.List;

/**
 * Created by chenzi on 3/3/2016.
 */
public interface DataAssetService {

  DataAsset findByName(String sourceName, String assetName);

  void create(DataAsset asset);

  void create(Iterable<DataAsset> asset);

  void update(DataAsset asset);

  Iterable<DataAsset> findAll();

  void delete(String sourceName, String assetName);

  void deleteBySourceName(String sourceName);

  void delete(DataAsset asset);

  void delete(Iterable<DataAsset> assets);

  void deleteDataAssetFieldsBySourceName(String sourceName);

  void updateDataAssetStructure(String sourceName, String name, DataAssetStructure structure);

  void updateDataAssetFields(String sourceName, String name, List<DataAssetField> fields);

  void updateDataAssetSummary(String sourceName, String name, DataAsset dataAsset);

  DataAssetDataSource[] getDataSources();

  Workspace[] getWorkspaces(String sourceName);

  List<DataAsset> findBySourceName(String sourceName);

  List<DataAsset> findBySourceNameAndType(String sourceName, DataAssetType type);

  List<DataAsset> foo (String sourceName);


}
