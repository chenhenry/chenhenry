package com.moodys.atlas.storage.service.impl;


import com.moodys.atlas.common.datamodel.api.Workspace;
import com.moodys.atlas.storage.domain.*;
import com.moodys.atlas.storage.repository.DataAssetRepository;
import com.moodys.atlas.storage.service.DataAssetService;
import com.moodys.atlas.storage.service.DataAssetValidationService;
import com.moodys.atlas.storage.service.DataConnectorInvokationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.security.InvalidParameterException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Service
@Transactional
public class DataAssetServiceImpl implements DataAssetService {

  private static final String UPDATE_ERROR_MSG = "DataAsset %s is assigned to files and cannot be updated";

  @Autowired
  private DataAssetRepository dataAssetRepository;

  @Autowired
  private DataAssetValidationService dataAssetValidationService;

  @Autowired
  private DataConnectorInvokationService dataConnectorInvokationService;

  private void validateNewDataAsset(DataAsset asset) {
    if (asset.getName() == null || "".equals(asset.getName())) {
      throw new InvalidParameterException("The name of the data asset must be provided");
    }

    if (dataAssetRepository.findBySourceNameAndName(asset.getSourceName(), asset.getName()) != null) {
      throw new InvalidParameterException("The name of the data asset must be unique");
    }

    if (asset.getName().length() > 30) {
      throw new InvalidParameterException("The name of the data asset must be 30 characters or less");
    }
    //validate structure
    if (asset.getStructure() == null) {
      throw new InvalidParameterException("The data asset structure must be provided");
    }
    if (asset.getStructure().getDateFormat() == null || "".equals(asset.getStructure().getDateFormat())) {
      throw new InvalidParameterException("The date format must be provided");
    }

    //validate fields
    if (asset.getFields() != null) {
      Set<String> nameSet = new HashSet<>();
      for (DataAssetField assetField : asset.getFields()) {
        if (assetField.getName() == null || "".equals(assetField.getName())) {
          throw new InvalidParameterException("The name of the field must be provided");
        }
        if (nameSet.contains(assetField.getName())) {
          throw new InvalidParameterException("The name of the field must be unique in this data asset");
        }
        if (assetField.getName().length() > 30) {
          throw new InvalidParameterException("The name of the field must be 30 characters or less");
        }
        if (assetField.getType() == null || "".equals(assetField.getType())) {
          throw new InvalidParameterException("The data type of the field must be provided");
        }
        if (assetField.getType() == null || "".equals(assetField.getType())) {
          throw new InvalidParameterException("The data type of the field must be provided");
        }
        nameSet.add(assetField.getName());
      }
    }
  }

  @Override
  public void create(DataAsset asset) {
    validateNewDataAsset(asset);
    dataAssetRepository.save(asset);
  }

  @Override
  public void create(Iterable<DataAsset> asset) {
    dataAssetRepository.save(asset);
  }

  @Override
  public DataAsset findByName(String sourceName, String assetName) {
    return dataAssetRepository.findBySourceNameAndName(sourceName, assetName);
  }

  @Override
  public Iterable<DataAsset> findAll() {
    return dataAssetRepository.findAll();
  }

  @Override
  public void delete(String sourceName, String assetName) {
    dataAssetRepository.deleteBySourceNameAndName(sourceName, assetName);
  }

  @Override
  public void deleteBySourceName(String sourceName) {
    dataAssetRepository.deleteBySourceName(sourceName);
  }

  @Override
  public void delete(DataAsset asset) {
    dataAssetRepository.delete(asset);
  }

  @Override
  public void delete(Iterable<DataAsset> assets) {
    dataAssetRepository.delete(assets);
  }

  @Override
  public void deleteDataAssetFieldsBySourceName(String sourceName) {
    dataAssetRepository.deleteDataAssetFieldsBySourceName(sourceName);
  }

  @Override
  public void update(DataAsset asset) {
    dataAssetRepository.save(asset);
  }

  @Override
  public void updateDataAssetStructure(String sourceName, String name, DataAssetStructure structure) {
    dataAssetValidationService.validateDataAssetStructureUpdate(sourceName, name, structure);
    DataAsset entity = findByName(sourceName, name);
    entity.setStructure(structure);
    dataAssetRepository.save(entity);
  }

  @Override
  public void updateDataAssetFields(String sourceName, String name, List<DataAssetField> fields) {

    dataAssetValidationService.validateDataAssetFieldsUpdate(sourceName, name, fields);
    DataAsset entity = findByName(sourceName, name);
    if (entity == null)
      throw new IllegalStateException("DataAssset with name: " + name + " does not exist. Unable to update fields.");
    if (entity.getFields() == null) {
      entity.setFields(fields);
    } else {
      entity.getFields().clear();
      if (fields != null) {
        for (DataAssetField field : fields) {
          field.setDataAsset(entity);
        }
        entity.getFields().addAll(fields);
      }
    }
    dataAssetRepository.save(entity);
  }

  @Override
  public void updateDataAssetSummary(String sourceName, String name, DataAsset dataAsset) {
    DataAsset entity = findByName(sourceName, name);
    entity.setDescription(dataAsset.getDescription());
    //also set structure if there are also structure update
    if (dataAsset.getStructure() != null) {
      dataAssetValidationService.validateDataAssetStructureUpdate(sourceName, name, dataAsset.getStructure());
      entity.setStructure(dataAsset.getStructure());
    }
    dataAssetRepository.save(entity);
  }

  @Override
  public DataAssetDataSource[] getDataSources() {
    DataAssetDataSource[] dataSources = dataConnectorInvokationService.retrieveDatasources();
    return dataSources;
  }

  @Override
  public Workspace[] getWorkspaces(String sourceName) {
    Assert.isTrue(!StringUtils.isEmpty(sourceName), "sourceName should not be null");
    return dataConnectorInvokationService.retrieveWorkSpaces(sourceName);
  }

  @Override
  public List<DataAsset> findBySourceName(String sourceName){
    return dataAssetRepository.findBySourceNameOrderBySourceNameAsc(sourceName);
  }

  @Override
  public List<DataAsset> findBySourceNameAndType(String sourceName, DataAssetType type){
    return dataAssetRepository.findBySourceNameAndTypeOrderBySourceNameAsc(sourceName, type);
  }

  @Override
  public List<DataAsset> foo(String sourceName){
    return dataAssetRepository.foo(sourceName);
  }
}
