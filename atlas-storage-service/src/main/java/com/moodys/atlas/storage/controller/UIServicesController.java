package com.moodys.atlas.storage.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.google.common.collect.HashMultiset;
import com.google.common.collect.Multiset;
import com.moodys.atlas.storage.domain.DataAsset;
import com.moodys.atlas.storage.domain.DataAssetDataSource;
import com.moodys.atlas.storage.domain.DataAssetJsonView;
import com.moodys.atlas.storage.domain.DataAssetLink;
import com.moodys.atlas.storage.domain.DataAssetLinkDataSetComp;
import com.moodys.atlas.storage.domain.DataAssetType;
import com.moodys.atlas.storage.service.DataAssetLinkService;
import com.moodys.atlas.storage.service.DataAssetService;
import com.moodys.atlas.storage.service.DataConnectorInvokationService;
import com.moodys.atlas.storage.util.DataAssetUtil;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by singprab on 5/4/2016.
 */

@RestController
@RequestMapping(path = "/storage/ui")
@CrossOrigin
public class UIServicesController {

  private static Logger logger = LoggerFactory.getLogger(UIServicesController.class);

  @Autowired
  private DataAssetService dataAssetService;

  @Autowired
  private DataAssetLinkService dataAssetLinkService;

  @Autowired
  private DataConnectorInvokationService dataConnectorInvokationService;

  @RequestMapping(method = RequestMethod.GET, path = "/dataSourcesSummary", produces = "application/json")
  @ApiOperation(value = "Get summary & count of Data Sources")
  public DataAssetDataSource[] getAllDataSources() throws IOException {

    // Get all Data Sources
    DataAssetDataSource[] dataSources = dataAssetService.getDataSources();

    // Get all Data Assets
    Iterable<DataAsset> dataAssets = dataAssetService.findAll();

    // Create Multiset to contain count of Data Assets for each Data Source
    Multiset<String> dataAssetCount = HashMultiset.create();

    // Add each Data Asset's Data Source to Multiset
    dataAssets.forEach((dataAsset) -> dataAssetCount.add(dataAsset.getSourceName()));

    for (DataAssetDataSource dataSource : dataSources) {
      dataSource.setDataAssetCount(dataAssetCount.count(dataSource.getName()));
    }

    return dataSources;
  }

  @RequestMapping(method = RequestMethod.GET, path = "/dataStructuresSummary/{dataSourceName}/", produces = "application/json")
  @ApiOperation(value = "Get summary & count of Data Structures")
  @JsonView(DataAssetJsonView.LinkCountSummary.class)
  public List<DataAsset> getAllDataStructures(@PathVariable String dataSourceName) {

    // For null or empty argument
    if (dataSourceName == null || dataSourceName.isEmpty()) {
      // TODO: handle status code later
//      return ResponseEntity.badRequest().body("Invalid Data Source name.");
      throw new RuntimeException("Invalid Data Source name.");
    }

    return dataAssetService.findBySourceName(dataSourceName);
  }

  @RequestMapping(method = RequestMethod.GET, path = "/dataStructuresSummary/{dataSourceName}/{type}/", produces = "application/json")
  @ApiOperation(value = "Get summary of Data Structures")
  @JsonView(DataAssetJsonView.Summary.class)
  public List<DataAsset> getDataStructures(@PathVariable String dataSourceName, @PathVariable DataAssetType type) {
    return dataAssetService.findBySourceNameAndType(dataSourceName, type);
  }

  @RequestMapping(method = RequestMethod.GET, path = "/foo/{dataSourceName}/", produces = "application/json")
  @ApiOperation(value = "Foo")
  @JsonView(DataAssetJsonView.Summary.class)
  public List<DataAsset> getDataStructures(@PathVariable String dataSourceName) {
    List<DataAsset> foo = dataAssetService.foo(dataSourceName);

    return foo;
  }

  @RequestMapping(method = RequestMethod.GET, path = "/{sourceName}/{assetName}/assignedFiles/")
  @ApiOperation(value = "Returns Files list assigned to an assetName.")
  public Iterable<DataAssetLinkDataSetComp> getAssignedFiles(@ApiParam(value = "Data source name", required = true) @PathVariable String sourceName,
                                                             @ApiParam(value = "Data asset name", required = true) @PathVariable String assetName) {
    logger.info("get all files to a data asset");
    DataAsset asset = dataAssetService.findByName(sourceName, assetName);
    if (asset == null) {
      throw new IllegalStateException("No data asset find by assetName: " + assetName);
    }
    List<DataAssetLinkDataSetComp> originalDataSets = asset.getLinks().stream().map(ol -> DataAssetUtil.buildDataAssetLinkDataSetComp(ol.getDataSetComp(), dataConnectorInvokationService.retrieveWorkSpace(ol.getDataSetComp().getSourceName(), ol.getDataSetComp().getWorkspace()))).collect(Collectors.toList());
    return originalDataSets;
  }

  @RequestMapping(method = RequestMethod.GET, path = "/{sourceName}/{assetName}/assignedLinks/")
  @ApiOperation(value = "Returns Files list assigned to an assetName.")
  public Iterable<DataAssetLink> getAssignedLinks(
      @ApiParam(value = "Data source name", required = true) @PathVariable String sourceName,
      @ApiParam(value = "Data asset name", required = true) @PathVariable String assetName) {
    logger.info("get all datas assigned to a data asset");
    if (assetName == null) {
      throw new IllegalStateException("No data asset find by assetName: " + assetName);
    }
    List<DataAssetLink> originalLinks =  dataAssetLinkService.getAssetLinks(sourceName, assetName);
    originalLinks.stream().map(ol -> DataAssetUtil.buildDataAssetLink(ol, dataConnectorInvokationService.retrieveWorkSpace(ol.getDataSetComp().getSourceName(), ol.getDataSetComp().getWorkspace()))).collect(Collectors.toList());
    return dataAssetLinkService.getAssetLinks(sourceName, assetName);
  }

  @RequestMapping(method = RequestMethod.DELETE, path = "/{sourceName}/{assetName}/dataLinks/{linkIds}")
  @ApiOperation(value = "Unassign data asset from file.")
  public void unassignDataAssetLinks(@ApiParam(value = "Data source name", required = true) @PathVariable String sourceName,
      @ApiParam(value = "Data asset name", required = true) @PathVariable String assetName,
                                     @ApiParam(value = "linkIds", required = true) @PathVariable String linkIds) throws UnsupportedEncodingException {
    logger.info("Unassign data asset from file");
    dataAssetLinkService.deleteAssetLinks(sourceName, assetName, linkIds);
  }

}