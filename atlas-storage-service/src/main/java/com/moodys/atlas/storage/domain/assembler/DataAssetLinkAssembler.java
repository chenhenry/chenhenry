package com.moodys.atlas.storage.domain.assembler;

import com.google.common.collect.Lists;
import com.moodys.atlas.common.datamodel.api.Dataset;
import com.moodys.atlas.common.datamodel.api.Workspace;
import com.moodys.atlas.storage.domain.DataAssetDataSource;
import com.moodys.atlas.storage.domain.DataAssetLink;
import com.moodys.atlas.storage.domain.DataAssetLinkDataSetComp;
import com.moodys.atlas.storage.domain.DataAssetLinkSource;
import com.moodys.atlas.storage.domain.builder.DataAssetLinkBuilder;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by pengx on 4/28/2016.
 */
public class DataAssetLinkAssembler {

  public static List<DataAssetLink> assembleByDatasets(DataAssetDataSource dataSource, String workspace, Dataset[] datasets) {
    return Arrays.asList(datasets).stream().map(s->assembleByDataset(dataSource, workspace, s)).collect(Collectors.toList());
  }

  private static DataAssetLink assembleByDataset(DataAssetDataSource dataSource, String workspace, Dataset dataset) {
    DataAssetLinkBuilder builder = new DataAssetLinkBuilder();
    return builder.source(DataAssetLinkSource.valueOf(dataSource.getType().toUpperCase()))
        .dataSetComp(
            new DataAssetLinkDataSetComp(dataSource.getName(), workspace, dataset.getName())
        )
        .build();
  }



}
