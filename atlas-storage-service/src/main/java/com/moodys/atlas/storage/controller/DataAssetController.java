package com.moodys.atlas.storage.controller;


import com.fasterxml.jackson.annotation.JsonView;
import com.moodys.atlas.common.datamodel.api.Field;
import com.moodys.atlas.common.datamodel.api.FileStructure;
import com.moodys.atlas.common.datamodel.api.Workspace;
import com.moodys.atlas.services.commons.springboot.Pingable;
import com.moodys.atlas.storage.domain.*;
import com.moodys.atlas.storage.service.DataAssetImportService;
import com.moodys.atlas.storage.service.DataAssetLinkService;
import com.moodys.atlas.storage.service.DataAssetService;
import com.moodys.atlas.storage.service.DataConnectorInvokationService;
import edu.emory.mathcs.backport.java.util.Collections;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "/storage/dataassets")
@CrossOrigin
public class DataAssetController implements Pingable {

  private static Logger logger = LoggerFactory.getLogger(DataAssetController.class);

  @Autowired
  private DataAssetService dataAssetService;

  @Autowired
  private DataAssetLinkService dataAssetLinkService;

  @Autowired
  private DataAssetImportService dataAssetImportService;

  @Autowired
  private DataConnectorInvokationService dataConnectorInvokationService;

  @JsonView(DataAssetJsonView.Summary.class)
  @RequestMapping(method = RequestMethod.GET, path = "/", produces = "application/json")
  @ApiOperation(value = "Get summary of DataAssets")
  public Iterable<DataAsset> getAllDataAssetsSummary() {
    return dataAssetService.findAll();
  }

  @RequestMapping(method = RequestMethod.GET, path = "/{sourceName}/{assetName}", produces = "application/json")
  @ApiOperation(value = "Get details of a specific DataAsset")
  public DataAsset getDataAssetDetail(@PathVariable String sourceName, @PathVariable String assetName) {
    return dataAssetService.findByName(sourceName, assetName);
  }

  @RequestMapping(method = RequestMethod.POST, path = "/")
  @ApiOperation(value = "Create a DataAsset")
  public void createDataAsset(@RequestBody DataAsset asset) {
    //TODO: the creator needs to be filled
    asset.setCreateTime(new Date());
    if (asset.getFields() != null) {
      for (DataAssetField field : asset.getFields()) {
        field.setDataAsset(asset);
      }
    }
    dataAssetService.create(asset);
  }

  @RequestMapping(method = RequestMethod.DELETE, path = "/{sourceName}/{assetName}")
  @ApiOperation(value = "Delete a DataAsset by name")
  public void deleteDataAsset(@PathVariable String sourceName, @PathVariable String assetName) {
    logger.info("delete data asset with name: " + assetName);
    dataAssetService.delete(sourceName, assetName);
  }

  @RequestMapping(method = RequestMethod.PUT, path = "/{sourceName}/{assetName}")
  @ApiOperation(value = "Update a DataAsset summary")
  public void updateDataAssetSummary(@PathVariable String sourceName, @PathVariable String assetName, @RequestBody DataAsset dataAsset) {
    logger.info("update data asset with name: " + assetName);
    dataAssetService.updateDataAssetSummary(sourceName, assetName, dataAsset);
  }

  @RequestMapping(method = RequestMethod.GET, path = "/{sourceName}/{assetName}/fields")
  public List<DataAssetField> getDataAssetFields(@PathVariable String sourceName, @PathVariable String assetName) {
    DataAsset dataAsset = dataAssetService.findByName(sourceName, assetName);
    if (dataAsset == null) {
      return Collections.emptyList();
    }
    return dataAsset.getFields();
  }

  @RequestMapping(method = RequestMethod.PUT, path = "/{sourceName}/{assetName}/structure")
  @ApiOperation(value = "Update the structure of a DataAsset")
  public void updateDataAssetStructure(@PathVariable String sourceName, @PathVariable String assetName, @RequestBody DataAssetStructure structure) {
    dataAssetService.updateDataAssetStructure(sourceName, assetName, structure);
  }

  @RequestMapping(method = RequestMethod.PUT, path = "/{sourceName}/{assetName}/fields")
  @ApiOperation(value = "Update fields of a DataAsset")
  public void updateDataAssetFields(@PathVariable String sourceName, @PathVariable String assetName, @RequestBody List<DataAssetField> fields) {
    dataAssetService.updateDataAssetFields(sourceName, assetName, fields);
  }

  @RequestMapping(method = RequestMethod.GET, path = "/{sourceName}/{assetName}/data/")
  @ApiOperation(value = "Returns Files/Tables list assigned to an assetName.")
  public Iterable<DataAssetLink> getDataAssetLinks(@ApiParam(value = "Data source name", required = true) @PathVariable String sourceName,
                                                   @ApiParam(value = "Data asset name", required = true) @PathVariable String assetName) {
    logger.info("get all datas assigned to a data asset");
    return dataAssetLinkService.getAssetLinks(sourceName, assetName);
  }

  @RequestMapping(method = RequestMethod.DELETE, path = "/{sourceName}/{assetName}/data/{workspace}/{dataSet:.+}")
  @ApiOperation(value = "Unassign data asset from file.")
  public void unassignDataAssetLink(
      @ApiParam(value = "Source Name", required = true) @PathVariable String sourceName,
      @ApiParam(value = "Data asset name", required = true) @PathVariable String assetName,
      @ApiParam(value = "Workspace", required = true) @PathVariable String workspace,
      @ApiParam(value = "DataSet", required = true) @PathVariable String dataSet) throws UnsupportedEncodingException {
    logger.info("Unassign data asset from file");
    dataAssetLinkService.deleteAssetLink(sourceName, assetName, new DataAssetLinkDataSetComp(sourceName, workspace, dataSet));
  }


  @RequestMapping(method = RequestMethod.POST, path = "/{sourceName}/{assetName}/data/")
  @ApiOperation(value = "Assign data asset to file.")
  public void assignDataAssetLinks(@ApiParam(value = "Data source name", required = true)
                                   @PathVariable String sourceName,
                                   @ApiParam(value = "Data asset name", required = true)
                                   @PathVariable String assetName, @RequestBody List<DataAssetLink> links) {
    logger.info("Assign data asset to file.");
    dataAssetLinkService.addAssetLinks(sourceName, assetName, links);
  }

  @RequestMapping(method = RequestMethod.POST, path = "/importDataAssets/")
  @ApiOperation(value = "import data assets.")
  public String importDataAssets(@RequestBody String sourceName) throws Exception {
    logger.info("import data asset beginning.");
    long startTime = System.currentTimeMillis();
    dataAssetImportService.importDataAssets(sourceName);
    long endTime = System.currentTimeMillis();
    logger.info("costs ：" + (endTime - startTime) + "ms");
    return sourceName;
  }

  @RequestMapping(method = RequestMethod.GET, path = "/dataSources/")
  @ApiOperation(value = "Get data sources.")
  public DataAssetDataSource[] getDataSources() throws Exception {
    return dataAssetService.getDataSources();
  }

  @RequestMapping(method = RequestMethod.GET, path = "/dataSources/{sourceName}/workspaces/")
  @ApiOperation(value = "Get workspaces.")
  public Workspace[] getWorkspaces(@ApiParam(value = "Source name", required = true) @PathVariable String sourceName) {

    logger.info("Get workspaces");
    return dataAssetService.getWorkspaces(sourceName);

  }

  @RequestMapping(method = RequestMethod.GET, path = "/dataconnector/{sourceName}/{workspace}/{dataset}/structure")
  @ApiOperation(value = "Get dataset file structure")
  public FileStructure getDatasetStructure(@PathVariable String sourceName, @PathVariable String workspace,
                                           @PathVariable String dataset) {
    return dataConnectorInvokationService.retrieveDatasetStructure(new DataAssetLinkDataSetComp(sourceName, workspace, dataset));
  }

  @RequestMapping(method = RequestMethod.GET, path = "/dataconnector/{sourceName}/{workspace}/{dataset}/fields")
  @ApiOperation(value = "Get dataset file structure")
  public Field[] getDatasetFields(@PathVariable String sourceName, @PathVariable String workspace,
                                  @PathVariable String dataset) {
    return dataConnectorInvokationService.retrieveDatasetFields(new DataAssetLinkDataSetComp(sourceName, workspace, dataset));
  }

  @RequestMapping(method = RequestMethod.GET, path = "/{sourceName}/{workspace}/unassigned/")
  public Iterable<DataAssetLink> getUnassignedDataAssetLinks(@ApiParam(value = "Source name", required = true) @PathVariable String sourceName,
                                                             @ApiParam(value = "Workspace", required = true) @PathVariable String workspace) {

    logger.info("Get unassigned data asset links");
    List<DataAssetLink> links = dataAssetLinkService.getUnassignedAssetLinks(sourceName, workspace);
    return links;

  }


}
