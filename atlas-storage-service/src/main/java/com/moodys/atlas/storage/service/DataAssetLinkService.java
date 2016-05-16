package com.moodys.atlas.storage.service;

import com.moodys.atlas.storage.domain.DataAsset;
import com.moodys.atlas.storage.domain.DataAssetLink;
import com.moodys.atlas.storage.domain.DataAssetLinkDataSetComp;

import java.util.List;

/**
 * Created by pengx on 3/4/2016.
 */
public interface DataAssetLinkService {
  List<DataAssetLink> getAssetLinks(String sourceName, String assetName);

  void deleteAssetLink(String sourceName, String assetName, DataAssetLinkDataSetComp dataSetComp);

  void deleteAssetLinks(String sourceName, String assetName, String linkIds);

  void addAssetLinks(String sourceName, String assetName, List<DataAssetLink> links);

  void deleteDataAssetLinksBySourceName(String sourceName);

  DataAsset getDataAssetByDataSet(DataAssetLinkDataSetComp dataSetComp);

  List<DataAssetLink> getUnassignedAssetLinks(String sourceName, String workspace);

}
