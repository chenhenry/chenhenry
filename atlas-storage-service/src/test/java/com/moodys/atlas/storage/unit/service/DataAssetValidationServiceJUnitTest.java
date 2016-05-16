package com.moodys.atlas.storage.unit.service;

import com.moodys.atlas.common.datamodel.api.DataType;
import com.moodys.atlas.common.datamodel.api.Field;
import com.moodys.atlas.storage.domain.DataAsset;
import com.moodys.atlas.storage.domain.DataAssetLink;
import com.moodys.atlas.storage.domain.DataAssetLinkDataSetComp;
import com.moodys.atlas.storage.domain.DataAssetLinkSource;
import com.moodys.atlas.storage.domain.DataAssetType;
import com.moodys.atlas.storage.domain.builder.CsvFileStructureBuilder;
import com.moodys.atlas.storage.domain.builder.DataAssetBuilder;
import com.moodys.atlas.storage.domain.builder.DataAssetFieldBuilder;
import com.moodys.atlas.storage.domain.builder.DataAssetLinkBuilder;
import com.moodys.atlas.storage.domain.builder.DataAssetStructureBuilder;
import com.moodys.atlas.storage.domain.builder.FieldBuilder;
import com.moodys.atlas.storage.exception.InvalidDataAssetChangeException;
import com.moodys.atlas.storage.exception.InvalidDataAssetFieldsException;
import com.moodys.atlas.storage.service.DataAssetService;
import com.moodys.atlas.storage.service.DataAssetValidationService;
import com.moodys.atlas.storage.service.DataConnectorInvokationService;
import com.moodys.atlas.storage.service.impl.DataAssetValidationServiceImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.Date;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;


@RunWith(MockitoJUnitRunner.class)
public class DataAssetValidationServiceJUnitTest {

  @InjectMocks
  private DataAssetValidationService dataAssetValidationService = new DataAssetValidationServiceImpl();

  @Mock
  private DataConnectorInvokationService dataConnectorInvokationService;

  @Mock
  private DataAssetService dataAssetService;

  @Test
  public void test1_validateDatasetAssignment() {

    when(dataConnectorInvokationService.retrieveDatasetStructure(
        new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "american_format.csv" )
    )).thenReturn(
        new CsvFileStructureBuilder()
            .dateFormat("MM/dd/YYYY")
            .decimalSeparator(",")
            .fieldSeparator(",")
            .hasHeaders(true)
            .recordDelimiter("\n")
            .valueDelimiter("\"")
            .build()
    );

    when(dataConnectorInvokationService.retrieveDatasetFields(
        new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "american_format.csv" )
    )).thenReturn(
        new Field[]{
            new FieldBuilder().name("name").order(1).description("name").nullable(false).dataType(DataType.STRING).build(),
            new FieldBuilder().name("outstanding").order(2).description("outstanding").nullable(false).dataType(DataType.AMOUNT).build()
        }
    );

    when(dataAssetService.findByName("hdfs-obelix-qa", "asset1")).thenReturn(
        new DataAssetBuilder()
            .createTime(new Date())
            .creator("Iven")
            .description("mocked data asset 1")
            .name("asset1")
            .sourceName("hdfs-obelix-qa")
            .type(DataAssetType.CSV)
            .structure(
                new DataAssetStructureBuilder()
                    .charset("UTF-8")
                    .comment(true).delimiter(",")
                    .escape("\\")
                    .header(1)
                    .nullValue("#$$#")
                    .quote(",")
                    .delimiter(",")
                    .dataFormat("MM/dd/YYYY")
                    .decimalSeparator(",")
                    .recordDelimiter("\n")
                    .valueDelimiter("\"")
                    .build()
            ).fields(
            Arrays.asList(
                new DataAssetFieldBuilder().index(1).name("name").type("STRING").nullable(true).build(),
                new DataAssetFieldBuilder().index(2).name("outstanding").type("AMOUNT").nullable(true).build()
            )).build()
    );

    when(dataAssetService.findByName("hdfs-obelix-qa", "asset2")).thenReturn(
        new DataAssetBuilder()
            .createTime(new Date())
            .creator("Iven")
            .description("mocked data asset 2")
            .name("asset2")
            .sourceName("hdfs-obelix-qa")
            .type(DataAssetType.CSV)
            .structure(
                new DataAssetStructureBuilder()
                    .charset("UTF-8")
                    .comment(true)
                    .delimiter(",")
                    .escape("\\")
                    .header(1).nullValue("#$$#")
                    .quote(",")
                    .dataFormat("MM/dd/YYYY")
                    .decimalSeparator(",")
                    .valueDelimiter("\"")
                    .recordDelimiter("\n").build()
            ).fields(
            Arrays.asList(
                new DataAssetFieldBuilder().index(1).name("name").type("STRING").nullable(true).build(),
                new DataAssetFieldBuilder().index(2).name("outstanding").type("AMOUNT").nullable(true).build()
            )).build()
    );

    DataAssetLink link = new DataAssetLinkBuilder()
        .createTime(new Date())
        .creator("ChenZi")
        .dataSetComp(new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "american_format.csv" ))
        .description("sample csv")
        .source(DataAssetLinkSource.HDFS)
        .build();
    dataAssetValidationService.validateDatasetAssignment("hdfs-obelix-qa", "asset1", link);
    dataAssetValidationService.validateDatasetAssignment("hdfs-obelix-qa", "asset2", link);

  }

  /**
   * matched structure with matched fields
   */
  @Test
  public void test2_validateDatasetAssignment() {

    when(dataConnectorInvokationService.retrieveDatasetStructure(
        new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "loan.csv" )
    )).thenReturn(
        new CsvFileStructureBuilder()
            .dateFormat("MM/dd/YYYY")
            .decimalSeparator(",")
            .fieldSeparator(",")
            .hasHeaders(true)
            .recordDelimiter("\n")
            .valueDelimiter("\"")
            .build()
    );

    when(dataConnectorInvokationService.retrieveDatasetFields(
        new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "loan.csv" )
    )).thenReturn(
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

    when(dataAssetService.findByName("hdfs-obelix-qa", "asset1")).thenReturn(
        new DataAssetBuilder()
            .createTime(new Date())
            .creator("Iven")
            .description("mocked data asset 1")
            .name("asset1")
            .sourceName("hdfs-obelix-qa")
            .type(DataAssetType.CSV)
            .structure(
                new DataAssetStructureBuilder()
                    .charset("UTF-8")
                    .comment(true).delimiter(",")
                    .escape("\\")
                    .header(1).nullValue("#$$#")
                    .quote(",")
                    .dataFormat("MM/dd/YYYY")
                    .decimalSeparator(",").delimiter(",")
                    .recordDelimiter("\n")
                    .valueDelimiter("\"")
                    .build()
            ).fields(
            Arrays.asList(
                new DataAssetFieldBuilder().index(1).name("contractRef").type("STRING").nullable(false).build(),
                new DataAssetFieldBuilder().index(2).name("pd").type("FLOAT").nullable(false).build(),
                new DataAssetFieldBuilder().index(4).name("maturityDate").type("DATE").nullable(false).build(),
                new DataAssetFieldBuilder().index(5).name("balance").type("FLOAT").nullable(false).build(),
                new DataAssetFieldBuilder().index(8).name("attrib1").type("STRING").nullable(true).build()
            )).build()
    );

    DataAssetLink link = new DataAssetLinkBuilder()
        .createTime(new Date())
        .creator("ChenZi")
        .dataSetComp(new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "loan.csv" ))
        .description("loan csv")
        .source(DataAssetLinkSource.HDFS)
        .build();

    dataAssetValidationService.validateDatasetAssignment("hdfs-obelix-qa", "asset1", link);
  }


  @Test
  public void test3_validateDatasetAssignment() {

    when(dataConnectorInvokationService.retrieveDatasetStructure(
        new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "loan.csv" )
    )).thenReturn(
        new CsvFileStructureBuilder()
            .dateFormat("MM/dd/YYYY")
            .decimalSeparator(",")
            .fieldSeparator(",")
            .hasHeaders(true)
            .recordDelimiter("\n")
            .valueDelimiter("\"")
            .build()
    );

    when(dataConnectorInvokationService.retrieveDatasetFields(
        new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "loan.csv" )
    )).thenReturn(
        new Field[]{
            new FieldBuilder().name("name").order(1).description("contractRef").nullable(false).dataType(DataType.STRING).build(),
            new FieldBuilder().name("pd").order(2).description("pd").nullable(false).dataType(DataType.FLOAT).build(),
            new FieldBuilder().name("junk22").order(3).description("junk 22").nullable(true).dataType(DataType.DATE).build(),
            new FieldBuilder().name("maturityDate").order(4).description("maturity date").nullable(false).dataType(DataType.DATE).build(),
            new FieldBuilder().name("balance").order(5).description("balance").nullable(false).dataType(DataType.FLOAT).build(),
            new FieldBuilder().name("junk1").order(6).description("junk1").nullable(true).dataType(DataType.STRING).build(),
            new FieldBuilder().name("irelevant1").order(7).description("irelevant1").nullable(false).dataType(DataType.INT).build(),
            new FieldBuilder().name("attrib1").order(8).description("attribute 1").nullable(true).dataType(DataType.FLOAT).build(),
            new FieldBuilder().name("attrib2").order(9).description("attribute 2").nullable(true).dataType(DataType.FLOAT).build(),
        }
    );

    when(dataAssetService.findByName("hdfs-obelix-qa", "asset1")).thenReturn(
        new DataAssetBuilder()
            .createTime(new Date())
            .creator("Iven")
            .sourceName("hdfs-obelix-qa")
            .description("mocked data asset 1")
            .name("asset1")
            .type(DataAssetType.CSV)
            .structure(
                new DataAssetStructureBuilder()
                    .charset("UTF-8")
                    .comment(true).delimiter(",")
                    .escape("\\")
                    .header(1).nullValue("#$$#")
                    .quote(",")
                    .dataFormat("MM/dd/YYYY").valueDelimiter("\"")
                    .decimalSeparator(",").delimiter(",").recordDelimiter("\n").build()
            ).fields(
            Arrays.asList(
                new DataAssetFieldBuilder().index(1).name("contractRef").type("STRING").nullable(false).build(),
                new DataAssetFieldBuilder().index(2).name("pd").type("FLOAT").nullable(false).build(),
                new DataAssetFieldBuilder().index(4).name("maturityDate").type("DATE").nullable(false).build(),
                new DataAssetFieldBuilder().index(5).name("balance").type("FLOAT").nullable(false).build(),
                new DataAssetFieldBuilder().index(8).name("attrib1").type("STRING").nullable(true).build()
            )).build()
    );

    DataAssetLink link = new DataAssetLinkBuilder()
        .createTime(new Date())
        .creator("ChenZi")
        .dataSetComp(new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "loan.csv" ))
        .description("loan csv")
        .source(DataAssetLinkSource.HDFS)
        .build();

    dataAssetValidationService.validateDatasetAssignment("hdfs-obelix-qa", "asset1", link);

  }


  //type compatible test
  @Test
  public void test4_validateDatasetAssignment() {

    when(dataConnectorInvokationService.retrieveDatasetStructure(
        new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "loan.csv" )
    )).thenReturn(
        new CsvFileStructureBuilder()
            .dateFormat("MM/dd/YYYY")
            .decimalSeparator(",")
            .fieldSeparator(",")
            .hasHeaders(true)
            .recordDelimiter("\n")
            .valueDelimiter("\"")
            .build()
    );

    when(dataConnectorInvokationService.retrieveDatasetFields(
        new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "loan.csv" )
    )).thenReturn(
        new Field[]{
            new FieldBuilder().name("contract-ref").order(1).description("contractRef").nullable(false).dataType(DataType.INT).build(),
            new FieldBuilder().name("pd").order(2).description("pd").nullable(false).dataType(DataType.FLOAT).build(),
            new FieldBuilder().name("junk22").order(3).description("junk 22").nullable(true).dataType(DataType.DATE).build(),
            new FieldBuilder().name("maturity_date").order(4).description("maturity date").nullable(false).dataType(DataType.DATE).build(),
            new FieldBuilder().name("balance").order(5).description("balance").nullable(false).dataType(DataType.FLOAT).build(),
            new FieldBuilder().name("junk1").order(6).description("junk1").nullable(true).dataType(DataType.STRING).build(),
            new FieldBuilder().name("irelevant1").order(7).description("irelevant1").nullable(false).dataType(DataType.INT).build(),
            new FieldBuilder().name("attrib1").order(8).description("attribute 1").nullable(true).dataType(DataType.FLOAT).build(),
        }
    );

    when(dataAssetService.findByName("hdfs-obelix-qa", "asset1")).thenReturn(
        new DataAssetBuilder()
            .createTime(new Date())
            .creator("Iven")
            .description("mocked data asset 1")
            .name("asset1")
            .sourceName("hdfs-obelix-qa")
            .type(DataAssetType.CSV)
            .structure(
                new DataAssetStructureBuilder()
                    .charset("UTF-8")
                    .comment(true).delimiter(",")
                    .escape("\\")
                    .header(1).nullValue("#$$#")
                    .quote(",")
                    .dataFormat("MM/dd/YYYY").valueDelimiter("\"")
                    .decimalSeparator(",").delimiter(",").recordDelimiter("\n").build()
            ).fields(
            Arrays.asList(
                new DataAssetFieldBuilder().index(1).name("contractRef").type("STRING").nullable(false).build(),
                new DataAssetFieldBuilder().index(2).name("pd").type("FLOAT").nullable(false).build(),
                new DataAssetFieldBuilder().index(4).name("maturityDate").type("DATE").nullable(false).build(),
                new DataAssetFieldBuilder().index(5).name("balance").type("FLOAT").nullable(false).build(),
                new DataAssetFieldBuilder().index(8).name("attrib1").type("STRING").nullable(true).build()
            )).build()
    );

    DataAssetLink link = new DataAssetLinkBuilder()
        .createTime(new Date())
        .creator("ChenZi")
        .dataSetComp(new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "loan.csv" ))
        .description("loan csv")
        .source(DataAssetLinkSource.HDFS)
        .build();

    dataAssetValidationService.validateDatasetAssignment("hdfs-obelix-qa", "asset1", link);

  }

  @Test(expected = InvalidDataAssetFieldsException.class)
  public void test5_validateDatasetAssignment() {

    when(dataConnectorInvokationService.retrieveDatasetStructure(
        new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "loan.csv" )
    )).thenReturn(
        new CsvFileStructureBuilder()
            .dateFormat("MM/dd/YYYY")
            .decimalSeparator(",")
            .fieldSeparator(",")
            .hasHeaders(true)
            .recordDelimiter("\n")
            .valueDelimiter(" ")
            .build()
    );

    when(dataConnectorInvokationService.retrieveDatasetFields(
        new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "loan.csv" )
    )).thenReturn(
        new Field[]{
            new FieldBuilder().name("contract-ref").order(1).description("contractRef").nullable(false).dataType(DataType.INT).build(),
            new FieldBuilder().name("pd").order(2).description("pd").nullable(false).dataType(DataType.STRING).build(),
            new FieldBuilder().name("junk22").order(3).description("junk 22").nullable(true).dataType(DataType.DATE).build(),
            new FieldBuilder().name("maturity_date").order(4).description("maturity date").nullable(false).dataType(DataType.DATE).build(),
            new FieldBuilder().name("balance").order(5).description("balance").nullable(false).dataType(DataType.FLOAT).build(),
            new FieldBuilder().name("junk1").order(6).description("junk1").nullable(true).dataType(DataType.STRING).build(),
            new FieldBuilder().name("irelevant1").order(7).description("irelevant1").nullable(false).dataType(DataType.INT).build(),
            new FieldBuilder().name("attrib1").order(8).description("attribute 1").nullable(true).dataType(DataType.FLOAT).build(),
        }
    );

    when(dataAssetService.findByName("hdfs-obelix-qa", "asset1")).thenReturn(
        new DataAssetBuilder()
            .createTime(new Date())
            .creator("Iven")
            .description("mocked data asset 1")
            .name("asset1")
            .sourceName("hdfs-obelix-qa")
            .type(DataAssetType.CSV)
            .structure(
                new DataAssetStructureBuilder()
                    .charset("UTF-8")
                    .comment(true).delimiter(",")
                    .escape("\\")
                    .header(1).nullValue("#$$#")
                    .quote(",")
                    .dataFormat("MM/dd/YYYY")
                    .decimalSeparator(",")
                    .delimiter(",")
                    .valueDelimiter(" ")
                    .recordDelimiter("\n").build()
            ).fields(
            Arrays.asList(
                new DataAssetFieldBuilder().index(1).name("contractRef").type("STRING").nullable(false).build(),
                new DataAssetFieldBuilder().index(2).name("pd").type("FLOAT").nullable(false).build(),
                new DataAssetFieldBuilder().index(4).name("maturityDate").type("DATE").nullable(false).build(),
                new DataAssetFieldBuilder().index(5).name("balance").type("FLOAT").nullable(false).build(),
                new DataAssetFieldBuilder().index(8).name("attrib1").type("STRING").nullable(true).build()
            )).build()
    );

    DataAssetLink link = new DataAssetLinkBuilder()
        .createTime(new Date())
        .creator("ChenZi")
        .dataSetComp(new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "loan.csv" ))
        .description("loan csv")
        .source(DataAssetLinkSource.HDFS)
        .build();

    dataAssetValidationService.validateDatasetAssignment("hdfs-obelix-qa", "asset1", link);

  }


  @Test
  public void test6_validateDatasetAssignment() {

    when(dataConnectorInvokationService.retrieveDatasetStructure(
        new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "loan.csv" )
    )).thenReturn(
        new CsvFileStructureBuilder()
            .dateFormat("MM/dd/YYYY")
            .decimalSeparator(",")
            .fieldSeparator(",")
            .hasHeaders(true)
            .recordDelimiter("\n")
            .valueDelimiter(" ")
            .build()
    );

    when(dataConnectorInvokationService.retrieveDatasetFields(
        new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "loan.csv" )
    )).thenReturn(
        new Field[]{
            new FieldBuilder().name("name").order(1).description("contractRef").nullable(false).dataType(DataType.STRING).build(),
            new FieldBuilder().name("pd").order(2).description("pd").nullable(false).dataType(DataType.FLOAT).build(),
            new FieldBuilder().name("maturityDate").order(3).description("maturity date").nullable(false).dataType(DataType.DATE).build(),
            new FieldBuilder().name("balance").order(4).description("balance").nullable(false).dataType(DataType.FLOAT).build(),
            new FieldBuilder().name("attrib1").order(5).description("attribute 1").nullable(true).dataType(DataType.FLOAT).build(),
        }
    );

    when(dataAssetService.findByName("hdfs-obelix-qa", "asset1")).thenReturn(
        new DataAssetBuilder()
            .createTime(new Date())
            .creator("Iven")
            .description("mocked data asset 1")
            .name("asset1")
            .sourceName("hdfs-obelix-qa")
            .type(DataAssetType.CSV)
            .structure(
                new DataAssetStructureBuilder()
                    .charset("UTF-8")
                    .comment(true).delimiter(",")
                    .escape("\\")
                    .header(1).nullValue("#$$#")
                    .quote(",")
                    .valueDelimiter(" ")
                    .dataFormat("MM/dd/YYYY")
                    .decimalSeparator(",").delimiter(",").recordDelimiter("\n").build()
            ).fields(
            Arrays.asList(
                new DataAssetFieldBuilder().index(1).name("contractRef").type("STRING").nullable(false).build(),
                new DataAssetFieldBuilder().index(2).name("pd").type("FLOAT").nullable(false).build(),
                new DataAssetFieldBuilder().index(3).name("maturityDate").type("DATE").nullable(false).build(),
                new DataAssetFieldBuilder().index(4).name("balance").type("FLOAT").nullable(false).build(),
                new DataAssetFieldBuilder().index(8).name("attrib1").type("STRING").nullable(true).build()
            )).build()
    );

    DataAssetLink link = new DataAssetLinkBuilder()
        .createTime(new Date())
        .creator("ChenZi")
        .dataSetComp(new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "loan.csv" ))
        .description("loan csv")
        .source(DataAssetLinkSource.HDFS)
        .build();
    try {
      dataAssetValidationService.validateDatasetAssignment("hdfs-obelix-qa", "asset1", link);
    }catch (InvalidDataAssetFieldsException e) {
      assertEquals("The field index of data asset is out of the file indexes boundary", e.getMessage());
    }

  }


  @Test
  public void test_validateDataAssetStructureUpdate() {
    //mock the data asset whose structure is to be updated
    when(dataAssetService.findByName("hdfs-obelix-qa", "asset1")).thenReturn(
        new DataAssetBuilder()
            .createTime(new Date())
            .creator("Iven")
            .description("mocked data asset 1")
            .name("asset1")
            .sourceName("hdfs-obelix-qa")
            .type(DataAssetType.CSV)
            .structure(
                new DataAssetStructureBuilder()
                    .charset("UTF-8")
                    .comment(true).delimiter(",")
                    .escape("\\")
                    .header(1).nullValue("#$$#")
                    .quote(",")
                    .dataFormat("MM/dd/YYYY").valueDelimiter("\"")
                    .decimalSeparator(",").delimiter(",").recordDelimiter("\n").build()
            ).fields(
            Arrays.asList(
                new DataAssetFieldBuilder().index(1).name("contractRef").type("STRING").nullable(false).build(),
                new DataAssetFieldBuilder().index(2).name("pd").type("FLOAT").nullable(false).build(),
                new DataAssetFieldBuilder().index(3).name("maturityDate").type("DATE").nullable(false).build(),
                new DataAssetFieldBuilder().index(4).name("balance").type("FLOAT").nullable(false).build(),
                new DataAssetFieldBuilder().index(8).name("attrib1").type("STRING").nullable(true).build()
            )).links(Arrays.asList(
            new DataAssetLinkBuilder()
                .createTime(new Date()).creator("Iven").dataSetComp(new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "loan1.csv" ))
                .description("loandepo 1").source(DataAssetLinkSource.HDFS)
                .build(),
            new DataAssetLinkBuilder()
                .createTime(new Date()).creator("Iven").dataSetComp(new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "loan2.csv"))
                .description("loandepo 2").source(DataAssetLinkSource.HDFS)
                .build()
        )).build()
    );

    //mock the structure meta of loan1.csv
    when(dataConnectorInvokationService.retrieveDatasetStructure(
        new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "loan1.csv" )
    )).thenReturn(
        new CsvFileStructureBuilder()
            .dateFormat("MM/dd/YYYY")
            .decimalSeparator(",")
            .fieldSeparator(",")
            .hasHeaders(true)
            .recordDelimiter("\n")
            .valueDelimiter("\"")
            .build()
    );

    //mock the structure meta of loan2.csv
    when(dataConnectorInvokationService.retrieveDatasetStructure(
        new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "loan2.csv" )
    )).thenReturn(
        new CsvFileStructureBuilder()
            .dateFormat("MM/dd/YYYY")
            .decimalSeparator(",")
            .fieldSeparator(",")
            .hasHeaders(true)
            .recordDelimiter("\n")
            .valueDelimiter("\"")
            .build()
    );

    DataAsset asset1 = dataAssetService.findByName("hdfs-obelix-qa", "asset1");
    //assert ok before data structure change
    dataAssetValidationService.validateDataAssetStructureUpdate("hdfs-obelix-qa", "asset1", asset1.getStructure());
    //should be false after changing the data structure
    dataAssetValidationService.validateDataAssetStructureUpdate("hdfs-obelix-qa", "asset1",
        new DataAssetStructureBuilder()
            .charset("UTF-8")
            .comment(true).delimiter(":")
            .escape("\\")
            .header(1).nullValue("#$$#")
            .quote(",")
            .dataFormat("MM/dd/YYYY").valueDelimiter("\"")
            .decimalSeparator(",").delimiter(",").recordDelimiter("\n").build());
  }

  @Test
  public void test_validateDataAssetFieldsUpdate() {

    //mock the data asset whose structure is to be updated
    when(dataAssetService.findByName("hdfs-obelix-qa", "asset1")).thenReturn(
        new DataAssetBuilder()
            .createTime(new Date())
            .creator("Iven")
            .description("mocked data asset 1")
            .name("asset1")
            .sourceName("hdfs-obelix-qa")
            .type(DataAssetType.CSV)
            .structure(
                new DataAssetStructureBuilder()
                    .charset("UTF-8")
                    .comment(true).delimiter(",")
                    .escape("\\")
                    .header(1).nullValue("#$$#")
                    .quote(",")
                    .dataFormat("MM/dd/YYYY").valueDelimiter("\"")
                    .decimalSeparator(",").delimiter(",").recordDelimiter("\n").build()
            ).fields(
            Arrays.asList(
                new DataAssetFieldBuilder().index(1).name("contractRef").type("STRING").nullable(false).build(),
                new DataAssetFieldBuilder().index(2).name("pd").type("FLOAT").nullable(false).build(),
                new DataAssetFieldBuilder().index(3).name("maturityDate").type("DATE").nullable(false).build(),
                new DataAssetFieldBuilder().index(4).name("balance").type("FLOAT").nullable(false).build(),
                new DataAssetFieldBuilder().index(5).name("attrib1").type("STRING").nullable(true).build()
            )).links(Arrays.asList(
            new DataAssetLinkBuilder()
                .createTime(new Date()).creator("Iven").dataSetComp(new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "loan1.csv" ))
                .description("loandepo 1").source(DataAssetLinkSource.HDFS)
                .build(),
            new DataAssetLinkBuilder()
                .createTime(new Date()).creator("Iven").dataSetComp(new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "loan2.csv" ))
                .description("loandepo 2").source(DataAssetLinkSource.HDFS)
                .build()
        )).build()
    );

    //mock fields of loan1.csv
    when(dataConnectorInvokationService.retrieveDatasetFields(
        new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "loan1.csv" )
    )).thenReturn(
        new Field[]{
            new FieldBuilder().name("name").order(1).description("contractRef").nullable(false).dataType(DataType.STRING).build(),
            new FieldBuilder().name("pd").order(2).description("pd").nullable(false).dataType(DataType.FLOAT).build(),
            new FieldBuilder().name("maturityDate").order(3).description("maturity date").nullable(false).dataType(DataType.DATE).build(),
            new FieldBuilder().name("balance").order(4).description("balance").nullable(false).dataType(DataType.FLOAT).build(),
            new FieldBuilder().name("attrib1").order(5).description("attribute 1").nullable(true).dataType(DataType.FLOAT).build(),
        }
    );

    //mock fields of loan2.csv
    when(dataConnectorInvokationService.retrieveDatasetFields(
        new DataAssetLinkDataSetComp("hdfs-obelix-qa","aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM", "loan2.csv" )
    )).thenReturn(
        new Field[]{
            new FieldBuilder().name("name").order(1).description("contractRef").nullable(false).dataType(DataType.STRING).build(),
            new FieldBuilder().name("pd").order(2).description("pd").nullable(false).dataType(DataType.FLOAT).build(),
            new FieldBuilder().name("maturityDate").order(3).description("maturity date").nullable(false).dataType(DataType.DATE).build(),
            new FieldBuilder().name("balance").order(4).description("balance").nullable(false).dataType(DataType.FLOAT).build(),
            new FieldBuilder().name("attrib1").order(5).description("attribute 1").nullable(true).dataType(DataType.FLOAT).build(),
        }
    );

    DataAsset asset1 = dataAssetService.findByName("hdfs-obelix-qa", "asset1");
    try {
      dataAssetValidationService.validateDataAssetFieldsUpdate("hdfs-obelix-qa", "asset1", asset1.getFields());
      dataAssetValidationService.validateDataAssetFieldsUpdate("hdfs-obelix-qa", "asset1",
          Arrays.asList(
              new DataAssetFieldBuilder().index(1).name("contractRef").type("STRING").nullable(false).build(),
              new DataAssetFieldBuilder().index(2).name("pd").type("FLOAT").nullable(false).build(),
              new DataAssetFieldBuilder().index(3).name("maturityDate").type("DATE").nullable(false).build(),
              new DataAssetFieldBuilder().index(4).name("balance").type("FLOAT").nullable(false).build(),
              new DataAssetFieldBuilder().index(8).name("attrib1").type("STRING").nullable(true).build())
      );
    }catch (InvalidDataAssetChangeException e) {
      assertEquals("The field index do not match the assigned file(s)", e.getMessage());
    }
  }

}
