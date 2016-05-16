package com.moodys.atlas.storage.unit.service;

import com.moodys.atlas.common.datamodel.api.DataType;
import com.moodys.atlas.common.datamodel.api.Dataset;
import com.moodys.atlas.common.datamodel.api.Field;
import com.moodys.atlas.common.datamodel.api.Workspace;
import com.moodys.atlas.storage.domain.DataAsset;
import com.moodys.atlas.storage.domain.DataAssetDataSource;
import com.moodys.atlas.storage.domain.DataAssetLinkDataSetComp;
import com.moodys.atlas.storage.domain.builder.DataAssetDataSourceBuilder;
import com.moodys.atlas.storage.domain.builder.DatasetBuilder;
import com.moodys.atlas.storage.domain.builder.FieldBuilder;
import com.moodys.atlas.storage.service.DataAssetImportService;
import com.moodys.atlas.storage.service.DataAssetLinkService;
import com.moodys.atlas.storage.service.DataAssetService;
import com.moodys.atlas.storage.service.DataConnectorInvokationService;
import com.moodys.atlas.storage.service.impl.DataAssetImportServiceImpl;
import com.moodys.atlas.storage.util.DataAssetUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.runners.MockitoJUnitRunner;
import org.mockito.stubbing.Answer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


@RunWith(MockitoJUnitRunner.class)
public class DataAssetImportServiceJUnitTest {

  @InjectMocks
  private DataAssetImportService dataAssetImportService = new DataAssetImportServiceImpl();

  @Mock
  private DataConnectorInvokationService dataConnectorInvokationService;

  @Mock
  private DataAssetService dataAssetService;

  @Mock
  private DataAssetLinkService dataAssetLinkService;

  @Test
  public void test1_importDataAssets() throws Exception {
    when(dataConnectorInvokationService.retrieveDatasources()).thenReturn(
        new DataAssetDataSource[]{
            new DataAssetDataSourceBuilder().name("hdfs-obelix-qa").type("hdfs").build(),
            new DataAssetDataSourceBuilder().name("RRT11P1_405").type("rfo").build(),
            new DataAssetDataSourceBuilder().name("hdfs-obelix").type("hdfs").build()
        }
    );

    doAnswer(new Answer() {
      @Override
      public Object answer(InvocationOnMock invocation) throws Throwable {
        Object[] args = invocation.getArguments();
        System.out.println("called delete() with arguments: " + Arrays.toString(args));
        return null;
      }
    }).when(dataAssetService).deleteBySourceName("RRT11P1_405");

    Workspace workspace = new Workspace();
    workspace.setId("1");
    when(dataConnectorInvokationService.retrieveWorkSpaces(
        "RRT11P1_405"
    )).thenReturn(
        new Workspace[]{
            workspace
        }
    );

    when(dataConnectorInvokationService.retrieveDatasets(
        "RRT11P1_405",
        "1"
    )).thenReturn(
        new Dataset[]{
            new DatasetBuilder().name("Test1").build(),
            new DatasetBuilder().name("Test2").build()
        }
    );

    when(dataConnectorInvokationService.retrieveDatasetFields(new DataAssetLinkDataSetComp(
        "RRT11P1_405",
        "1",
        "Test1"
    ))).thenReturn(
        new Field[]{
            new FieldBuilder().name("name").order(1).description("contractRef").nullable(false).dataType(DataType.STRING).build(),
            new FieldBuilder().name("pd").order(2).description("pd").nullable(false).dataType(DataType.FLOAT).build(),
            new FieldBuilder().name("junk22").order(3).description("junk 22").nullable(true).dataType(DataType.DATE).build(),
            new FieldBuilder().name("maturityDate").order(4).description("maturity date").nullable(false).dataType(DataType.DATE).build(),
            new FieldBuilder().name("balance").order(5).description("balance").nullable(false).dataType(DataType.FLOAT).build(),
            new FieldBuilder().name("junk1").order(6).description("junk1").nullable(true).dataType(DataType.STRING).build(),
            new FieldBuilder().name("irelevant1").order(7).description("irelevant1").nullable(false).dataType(DataType.INT).build(),
            new FieldBuilder().name("attrib1").order(8).description("attribute 1").nullable(true).dataType(DataType.FLOAT).build(),
        }
    );

    when(dataConnectorInvokationService.retrieveDatasetFields(new DataAssetLinkDataSetComp(
        "RRT11P1_405",
        "1",
        "Test2"
    ))).thenReturn(
        new Field[]{
            new FieldBuilder().name("name").order(1).description("contractRef").nullable(false).dataType(DataType.STRING).build(),
            new FieldBuilder().name("pd").order(2).description("pd").nullable(false).dataType(DataType.FLOAT).build(),
            new FieldBuilder().name("junk22").order(3).description("junk 22").nullable(true).dataType(DataType.DATE).build(),
            new FieldBuilder().name("maturityDate").order(4).description("maturity date").nullable(false).dataType(DataType.DATE).build(),
            new FieldBuilder().name("balance").order(5).description("balance").nullable(false).dataType(DataType.FLOAT).build(),
            new FieldBuilder().name("junk1").order(6).description("junk1").nullable(true).dataType(DataType.STRING).build(),
            new FieldBuilder().name("irelevant1").order(7).description("irelevant1").nullable(false).dataType(DataType.INT).build(),
            new FieldBuilder().name("attrib1").order(8).description("attribute 1").nullable(true).dataType(DataType.FLOAT).build(),
        }
    );
    List<DataAsset> dataAssets = new ArrayList<>();
    dataAssets.add(DataAssetUtil.buildDataAsset(new DataAssetLinkDataSetComp("RRT11P1_405",
        "1",
        "Test1"), new Field[]{
        new FieldBuilder().name("name").order(1).description("contractRef").nullable(false).dataType(DataType.STRING).build(),
        new FieldBuilder().name("pd").order(2).description("pd").nullable(false).dataType(DataType.FLOAT).build(),
        new FieldBuilder().name("junk22").order(3).description("junk 22").nullable(true).dataType(DataType.DATE).build(),
        new FieldBuilder().name("maturityDate").order(4).description("maturity date").nullable(false).dataType(DataType.DATE).build(),
        new FieldBuilder().name("balance").order(5).description("balance").nullable(false).dataType(DataType.FLOAT).build(),
        new FieldBuilder().name("junk1").order(6).description("junk1").nullable(true).dataType(DataType.STRING).build(),
        new FieldBuilder().name("irelevant1").order(7).description("irelevant1").nullable(false).dataType(DataType.INT).build(),
        new FieldBuilder().name("attrib1").order(8).description("attribute 1").nullable(true).dataType(DataType.FLOAT).build(),
    }));
    dataAssets.add(DataAssetUtil.buildDataAsset(new DataAssetLinkDataSetComp("RRT11P1_405",
        "1",
        "Test2"), new Field[]{
        new FieldBuilder().name("name").order(1).description("contractRef").nullable(false).dataType(DataType.STRING).build(),
        new FieldBuilder().name("pd").order(2).description("pd").nullable(false).dataType(DataType.FLOAT).build(),
        new FieldBuilder().name("junk22").order(3).description("junk 22").nullable(true).dataType(DataType.DATE).build(),
        new FieldBuilder().name("maturityDate").order(4).description("maturity date").nullable(false).dataType(DataType.DATE).build(),
        new FieldBuilder().name("balance").order(5).description("balance").nullable(false).dataType(DataType.FLOAT).build(),
        new FieldBuilder().name("junk1").order(6).description("junk1").nullable(true).dataType(DataType.STRING).build(),
        new FieldBuilder().name("irelevant1").order(7).description("irelevant1").nullable(false).dataType(DataType.INT).build(),
        new FieldBuilder().name("attrib1").order(8).description("attribute 1").nullable(true).dataType(DataType.FLOAT).build(),
    }));

    dataAssetImportService.importDataAssets("RRT11P1_405");
    verify(dataAssetService).create(dataAssets);

  }
}