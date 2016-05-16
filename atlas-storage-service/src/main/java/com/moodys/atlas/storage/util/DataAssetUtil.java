package com.moodys.atlas.storage.util;

import com.google.common.collect.Lists;
import com.moodys.atlas.common.datamodel.api.Field;
import com.moodys.atlas.common.datamodel.api.Workspace;
import com.moodys.atlas.storage.domain.DataAsset;
import com.moodys.atlas.storage.domain.DataAssetField;
import com.moodys.atlas.storage.domain.DataAssetLink;
import com.moodys.atlas.storage.domain.DataAssetLinkDataSetComp;
import com.moodys.atlas.storage.domain.DataAssetLinkSource;
import com.moodys.atlas.storage.domain.DataAssetType;
import com.moodys.atlas.storage.domain.builder.DataAssetBuilder;
import com.moodys.atlas.storage.domain.builder.DataAssetFieldBuilder;
import com.moodys.atlas.storage.domain.builder.DataAssetLinkBuilder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by henry on 3/24/2016.
 */
public class DataAssetUtil {

  public static DataAsset buildDataAsset(DataAssetLinkDataSetComp dataAssetLinkDataSetComp, Field[] fields) {
    List<DataAssetField> dataAssetFields = new ArrayList<>();
    for (Field field : fields) {
      // build dataAssetFields
      DataAssetField dataAssetField = new DataAssetFieldBuilder()
          .index(field.getOrder())
          .name(field.getName())
          .type(field.getDataType().name())
          .nullable(field.isNullable()).build();
      dataAssetFields.add(dataAssetField);
    }

    // build dataAssetLink
    List<DataAssetLink> links = Lists.newArrayList();
    DataAssetLink link = new DataAssetLinkBuilder()
        .createTime(new Date())
        .source(DataAssetLinkSource.RFO)
        .dataSetComp(dataAssetLinkDataSetComp)
        .build();
    links.add(link);

    return new DataAssetBuilder()
        .sourceName(dataAssetLinkDataSetComp.getSourceName())
        .createTime(new Date())
        .name(dataAssetLinkDataSetComp.getDataSet())
        .type(DataAssetType.ORACLE)
        .fields(dataAssetFields)
        .links(links)
        .build();
  }

  public static DataAssetLinkDataSetComp buildDataAssetLinkDataSetComp(DataAssetLinkDataSetComp dataAssetLinkDataSetComp, Workspace workspace) {
    dataAssetLinkDataSetComp.setPath(workspace.getPath());
    return dataAssetLinkDataSetComp;
  }

  public static DataAssetLink buildDataAssetLink(DataAssetLink dataAssetLink, Workspace workspace) {
    dataAssetLink.getDataSetComp().setPath(workspace.getPath());
    return dataAssetLink;
  }
}
