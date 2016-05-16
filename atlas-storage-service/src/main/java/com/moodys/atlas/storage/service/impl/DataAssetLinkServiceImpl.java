package com.moodys.atlas.storage.service.impl;

import com.google.common.collect.Lists;
import com.moodys.atlas.common.datamodel.api.Dataset;
import com.moodys.atlas.storage.domain.DataAsset;
import com.moodys.atlas.storage.domain.DataAssetDataSource;
import com.moodys.atlas.storage.domain.DataAssetLink;
import com.moodys.atlas.storage.domain.DataAssetLinkDataSetComp;
import com.moodys.atlas.storage.domain.assembler.DataAssetLinkAssembler;
import com.moodys.atlas.storage.repository.DataAssetLinkRepository;
import com.moodys.atlas.storage.service.DataAssetLinkService;
import com.moodys.atlas.storage.service.DataAssetService;
import com.moodys.atlas.storage.service.DataAssetValidationService;
import com.moodys.atlas.storage.service.DataConnectorInvokationService;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by pengx on 3/4/2016.
 */
@Service
public class DataAssetLinkServiceImpl implements DataAssetLinkService {

  private static Logger logger = LoggerFactory.getLogger(DataAssetLinkServiceImpl.class);

  @Autowired
  DataAssetLinkRepository assetLinkRepository;

  @Autowired
  DataAssetService assetService;

  @Autowired
  DataAssetValidationService dataAssetValidationService;

  @Autowired
  private DataConnectorInvokationService dataConnectorInvokationService;

  @Override
  public List<DataAssetLink> getAssetLinks(String sourceName, String assetName) {
    List<DataAssetLink> links = Collections.emptyList();

    DataAsset assets = assetService.findByName(sourceName, assetName);
    if (assets != null) {
      links = assets.getLinks();
    }
    // # TODO: ADD Call WebHDFS API to validate if all files assigned to the asset still exist in the lake
    return links;
  }

  @Override
  public void deleteAssetLink(String sourceName, String assetName, DataAssetLinkDataSetComp dataSetComp) {

    DataAsset asset = assetService.findByName(sourceName, assetName);
    if (asset == null || asset.getLinks().size() == 0) {
      logger.info("No data set assigned to asset {}, not to delete", assetName);
      return;
    }
    List<DataAssetLink> links = asset.getLinks();
    DataAssetLink link = assetLinkRepository.searchByAssetNameAndDataSetComp(assetName, dataSetComp);
    if (link == null) {
      logger.info("No data set {} assigned to asset {}, not delete", dataSetComp.toString(), assetName);
      return;
    }
    links.remove(link);
    assetService.update(asset);
  }

  @Override
  public void deleteAssetLinks(String sourceName, String assetName, String linkIds) {
    DataAsset asset = assetService.findByName(sourceName, assetName);
    if (asset == null || asset.getLinks().size() == 0) {
      logger.info("No data set assigned to asset {}, not to delete", assetName);
      return;
    }
    List<DataAssetLink> links = asset.getLinks();
    for(String linkId : linkIds.split(",")){
      DataAssetLink link =  assetLinkRepository.findOne(Long.valueOf(linkId));
      if (link == null) {
        continue;
      }
      links.remove(link);
    }
    assetService.update(asset);
  }

  @Override
  public void deleteDataAssetLinksBySourceName(String sourceName) {
    assetLinkRepository.deleteDataAssetLinksBySourceName(sourceName);
  }

  @Override
  public void addAssetLinks(String sourceName,  String assetName, List<DataAssetLink> links) {
    DataAsset asset = assetService.findByName(sourceName, assetName);
    if (asset == null) {
      throw new IllegalStateException("No data asset find by assetName: " + assetName + ", cannot add Asset Links on it");
    }
    List<DataAssetLinkDataSetComp> originalDataSets = asset.getLinks().stream().map(ol -> ol.getDataSetComp()).collect(Collectors.toList());
    List<DataAssetLink> addLinks = Lists.newArrayList();
    for (DataAssetLink link : links) {
      if (originalDataSets.contains(link.getDataSetComp())) {
        logger.info("Data set {} already assigned to asset {}, not to add again", link.getDataSetComp(), assetName);
      } else {
        link.setCreateTime(new Date());
        link.setDataAsset(asset);
        dataAssetValidationService.validateDatasetAssignment(sourceName, assetName, link);
        addLinks.add(link);
      }
    }
    asset.getLinks().addAll(addLinks);
    assetService.update(asset);
  }

  @Override
  public DataAsset getDataAssetByDataSet(DataAssetLinkDataSetComp dataSetComp) {
    DataAssetLink link = assetLinkRepository.findOneByDataSetComp(dataSetComp);
    if (link == null) {
      logger.info("No data asset link found by dataSet: {}" + dataSetComp.toString());
      return null;
    }
    return link.getDataAsset();

  }

  @Override
  public List<DataAssetLink> getUnassignedAssetLinks(String sourceName, String workspace) {
    if (StringUtils.isEmpty(sourceName)) {
      throw new IllegalStateException("SourceName should not be null");
    }
    if (StringUtils.isEmpty(workspace)) {
      throw new IllegalStateException("Workspace should not be null");
    }
    DataAssetDataSource dataSource = dataConnectorInvokationService.retrieveDatasource(sourceName);
    Dataset[] datasets =  dataConnectorInvokationService.retrieveDatasets(sourceName, workspace);
    List<DataAssetLink> links = DataAssetLinkAssembler.assembleByDatasets(dataSource, workspace, datasets);
    List<DataAssetLink> allAssignedLinks = assetLinkRepository.findBySourceNameAndWorkSpace(sourceName, workspace);
    List<DataAssetLinkDataSetComp> assignedDataSetComps = allAssignedLinks.stream().map(l -> l.getDataSetComp()).collect(Collectors.toList());
    return links.stream().filter(l -> !assignedDataSetComps.contains(l.getDataSetComp())).collect(Collectors.toList());
  }

}
