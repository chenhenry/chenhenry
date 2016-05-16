package com.moodys.atlas.storage.service;

import com.moodys.atlas.common.datamodel.api.Dataset;
import com.moodys.atlas.common.datamodel.api.Field;
import com.moodys.atlas.common.datamodel.api.FileStructure;
import com.moodys.atlas.common.datamodel.api.Workspace;
import com.moodys.atlas.storage.domain.DataAssetDataSource;
import com.moodys.atlas.storage.domain.DataAssetLinkDataSetComp;
import org.springframework.stereotype.Service;

@Service
public interface DataConnectorInvokationService {
  FileStructure retrieveDatasetStructure(DataAssetLinkDataSetComp dataSetComp);
  Field[] retrieveDatasetFields(DataAssetLinkDataSetComp dataSetComp);
  Workspace[] retrieveWorkSpaces(String sourceName);
  Workspace retrieveWorkSpace(String sourceName, String workspaceId);
  Dataset[] retrieveDatasets(String sourceName, String workspaceId);
  DataAssetDataSource[] retrieveDatasources();
  DataAssetDataSource retrieveDatasource(String sourceName);
}
