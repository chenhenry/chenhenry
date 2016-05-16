package com.moodys.atlas.storage.service.impl;

import com.moodys.atlas.common.datamodel.api.CsvFileStructure;
import com.moodys.atlas.common.datamodel.api.Dataset;
import com.moodys.atlas.common.datamodel.api.Field;
import com.moodys.atlas.common.datamodel.api.FileStructure;
import com.moodys.atlas.common.datamodel.api.Workspace;
import com.moodys.atlas.storage.domain.DataAssetDataSource;
import com.moodys.atlas.storage.domain.DataAssetLinkDataSetComp;
import com.moodys.atlas.storage.service.DataConnectorInvokationService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class DataConnectorInvokationServiceImpl implements DataConnectorInvokationService {

  private RestTemplate restTemplate = new RestTemplate();

  @Value("${dataconnector.service.url}")
  private String rootUrl;

  private final String GET_FIELDS_SERVICE_PATH = "/datasources/%s/workspaces/%s/datasets/%s/fields";

  private final String GET_STRUCTURE_SERVICE_PATH = "/datasources/%s/workspaces/%s/datasets/%s";

  private final String GET_WORKSPACES_SERVICE_PATH = "/datasources/%s/workspaces";

  private final String GET_WORKSPACE_SERVICE_PATH = "/datasources/%s/workspaces/%s";

  private final String GET_DATASETS_SERVICE_PATH = "/datasources/%s/workspaces/%s/datasets";

  private final String GET_DATASOURCES_SERVICE_PATH = "/datasources";

  private final String GET_DATASOURCE_SERVICE_PATH = "/datasources/%s";


  @Override
  public FileStructure retrieveDatasetStructure(DataAssetLinkDataSetComp dataSetComp) {
    String url = rootUrl + String.format(GET_STRUCTURE_SERVICE_PATH, dataSetComp.getSourceName(), dataSetComp.getWorkspace(), dataSetComp.getDataSet());
    Map<String,Object> result = restTemplate.getForObject(url, Map.class);
    Map<String,Object> structureMap = (Map<String, Object>)result.get("file_structure");

    FileStructure fileStructure = null;

    String format = structureMap.get("format").toString();

    if (format.equalsIgnoreCase("CSV")) {
      CsvFileStructure csvFileStructure = new CsvFileStructure();
      csvFileStructure.setDateFormat(structureMap.get("date_format").toString());
      csvFileStructure.setDecimalSeparator(structureMap.get("decimal_separator").toString());
      csvFileStructure.setRecordDelimiter(structureMap.get("record_delimiter").toString());
      csvFileStructure.setFieldSeparator(structureMap.get("field_separator").toString());
      csvFileStructure.setHasHeaders((Boolean)structureMap.get("has_headers"));
      csvFileStructure.setValueDelimiter(structureMap.get("value_delimiter").toString());

      fileStructure = csvFileStructure;
    } else {
      //TODO: reserve for parquet,avro
    }

    return fileStructure;
  }

  @Override
  public Field[] retrieveDatasetFields(DataAssetLinkDataSetComp dataSetComp) {
    String url = rootUrl + String.format(GET_FIELDS_SERVICE_PATH, dataSetComp.getSourceName(), dataSetComp.getWorkspace(), dataSetComp.getDataSet());
    Field[] fields = restTemplate.getForObject(url, Field[].class);
    return fields;
  }

  @Override
  public Workspace[] retrieveWorkSpaces(String sourceName) {
    String url = rootUrl + String.format(GET_WORKSPACES_SERVICE_PATH, sourceName);
    Workspace[] workspaces = restTemplate.getForObject(url, Workspace[].class);
    return workspaces;
  }

  @Override
  public Workspace retrieveWorkSpace(String sourceName, String workspaceId) {
    String url = rootUrl + String.format(GET_WORKSPACE_SERVICE_PATH, sourceName, workspaceId);
    Workspace workspace = restTemplate.getForObject(url, Workspace.class);
    return workspace;
  }

  @Override
  public Dataset[] retrieveDatasets(String sourceName, String workspaceId) {
    String url = rootUrl + String.format(GET_DATASETS_SERVICE_PATH, sourceName, workspaceId);
    Dataset[] datasets = restTemplate.getForObject(url, Dataset[].class);
    return datasets;
  }

  @Override
  public DataAssetDataSource[] retrieveDatasources() {
    String url = rootUrl + String.format(GET_DATASOURCES_SERVICE_PATH);
    DataAssetDataSource[] dataSources = restTemplate.getForObject(url, DataAssetDataSource[].class);
    return dataSources;
  }

  @Override
  public DataAssetDataSource retrieveDatasource(String sourceName) {
    String url = rootUrl + String.format(GET_DATASOURCE_SERVICE_PATH, sourceName);
    DataAssetDataSource dataSource = restTemplate.getForObject(url, DataAssetDataSource.class);
    return dataSource;
  }
}
