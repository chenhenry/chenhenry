package com.moodys.atlas.storage.service.impl;

import com.moodys.atlas.common.datamodel.api.Dataset;
import com.moodys.atlas.common.datamodel.api.Field;
import com.moodys.atlas.common.datamodel.api.RFoDataSource;
import com.moodys.atlas.common.datamodel.api.Workspace;
import com.moodys.atlas.storage.domain.DataAsset;
import com.moodys.atlas.storage.domain.DataAssetDataSource;
import com.moodys.atlas.storage.domain.DataAssetLinkDataSetComp;
import com.moodys.atlas.storage.service.DataAssetImportService;
import com.moodys.atlas.storage.service.DataAssetLinkService;
import com.moodys.atlas.storage.service.DataAssetService;
import com.moodys.atlas.storage.service.DataConnectorInvokationService;
import com.moodys.atlas.storage.util.DataAssetUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@Service
@Transactional
public class DataAssetImportServiceImpl implements DataAssetImportService {

  private static Logger logger = LoggerFactory.getLogger(DataAssetImportServiceImpl.class);

  private static final String ADMIN_WORKSPACE_ID = "1";

  @Value("${import.isMutilThread}")
  private boolean isMutilThread;

  @Autowired
  private DataAssetService dataAssetService;

  @Autowired
  private DataAssetLinkService dataAssetLinkService;

  @Autowired
  private DataConnectorInvokationService dataConnectorInvokationService;

  @Override
  public String importDataAssets(String sourceName) throws Exception {
    DataAssetDataSource[] dataSources = dataConnectorInvokationService.retrieveDatasources();
    Workspace[] workspaces = null;
    List<DataAsset> dataAssets = new ArrayList<>();
    List<DataAsset> dataAssetsWithField = new ArrayList<>();

    // delete all data assets for a given sources
    for (DataAssetDataSource dataSource : dataSources) {
      if (dataSource.getType().equals(RFoDataSource.DATASOURCE_TYPE) && dataSource.getName().equals(sourceName)) {
        dataAssetLinkService.deleteDataAssetLinksBySourceName(dataSource.getName());
        dataAssetService.deleteDataAssetFieldsBySourceName(dataSource.getName());
        dataAssetService.deleteBySourceName(dataSource.getName());
        // get the workspace
        workspaces = dataConnectorInvokationService.retrieveWorkSpaces(dataSource.getName());
      }
    }
    if (workspaces == null) {
      return sourceName;
    }

    if(isMutilThread){
      logger.info("import by multi-thread");
      Set tasks = new HashSet();
      for (Workspace workspace : workspaces) {
        if (workspace.getId().equals(ADMIN_WORKSPACE_ID)) {
          // get the dataSets
          Dataset[] dataSets = dataConnectorInvokationService.retrieveDatasets(sourceName, workspace.getId());
          for (Dataset dataset : dataSets) {
            tasks.add(new DataAssetCallable(new DataAssetLinkDataSetComp(sourceName, workspace.getId(), dataset.getName())));
          }
        }
      }

      try {
        logger.info("execute the tasks");
        ExecutorService executorService = Executors.newFixedThreadPool(5);
        List<Future> futures = executorService.invokeAll(tasks);
        if (futures.isEmpty()) {
          return sourceName;
        }
        logger.info("get the result");
        for (Future future: futures) {
          DataAsset dataAsset = (DataAsset) future.get();
          if(dataAsset.getFields() == null){
            dataAssetsWithField.add(dataAsset);
          }else{
            dataAssets.add(dataAsset);
          }
        }
        logger.info("finish the tasks");
        executorService.shutdown();

        logger.info("import fail data assets which size is {0}", dataAssetsWithField.size());
        for (DataAsset dataAsset : dataAssetsWithField) {
          Field[] fields = dataConnectorInvokationService.retrieveDatasetFields(new DataAssetLinkDataSetComp(sourceName, ADMIN_WORKSPACE_ID, dataAsset.getName()));
          dataAssets.add(DataAssetUtil.buildDataAsset(new DataAssetLinkDataSetComp(sourceName, ADMIN_WORKSPACE_ID, dataAsset.getName()), fields));
        }
        dataAssetService.create(dataAssets);
      } catch (Exception e) {
        logger.error(e.getMessage());
        throw e;
      }
    }else{
      logger.info("import by single thread");
      for (Workspace workspace : workspaces) {
        if (workspace.getId().equals(ADMIN_WORKSPACE_ID)) {
          // get the dataSets
          Dataset[] dataSets = dataConnectorInvokationService.retrieveDatasets(sourceName, workspace.getId());
          for (Dataset dataset : dataSets) {
            // get the fields
            Field[] fields = dataConnectorInvokationService.retrieveDatasetFields(new DataAssetLinkDataSetComp(sourceName, workspace.getId(), dataset.getName()));
            dataAssets.add(DataAssetUtil.buildDataAsset(new DataAssetLinkDataSetComp(sourceName, workspace.getId(), dataset.getName()), fields));
          }
        }
      }
      dataAssetService.create(dataAssets);
    }

    return sourceName;
  }

  public class DataAssetCallable implements Callable<DataAsset> {
    private DataAssetLinkDataSetComp dataAssetLinkDataSetComp = null;

    public DataAssetCallable(DataAssetLinkDataSetComp dataAssetLinkDataSetComp) {
      this.dataAssetLinkDataSetComp = dataAssetLinkDataSetComp;
    }

    @Override
    public DataAsset call() throws Exception {
      Thread.sleep(15);
      Field[] fields = null;
      try {
        fields = dataConnectorInvokationService.retrieveDatasetFields(dataAssetLinkDataSetComp);
      } catch (Exception e) {
        logger.error(e.getMessage());
      }
      return DataAssetUtil.buildDataAsset(dataAssetLinkDataSetComp, fields);
    }
  }
}
