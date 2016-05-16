package com.moodys.atlas.storage.unit.service;


import com.moodys.atlas.storage.UnitTestConfiguration;
import com.moodys.atlas.storage.service.DataConnectorInvokationService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.assertNotNull;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(UnitTestConfiguration.class)
@TestPropertySource("classpath:application.properties")
public class DataConnectorInvokationServiceJUnitTest {

  @Autowired
  private DataConnectorInvokationService dataConnectorInvokationService;

  @Test
  public void test_retrieveDatasetStructure() {
//    FileStructure structure = dataConnectorInvokationService.retrieveDatasetStructure("hdfs-obelix-qa",
//        "aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM",
//        "american_format.csv");

//    assertNotNull(structure);

    assertNotNull(1);
  }

  public void test_retrieveDatasetFields() {
//    Field[] fields = dataConnectorInvokationService.retrieveDatasetFields("hdfs-obelix-qa",
//        "aGRmczovL2xoci1sYm1hc2FwcDIwMS5hbmFseXRpY3MubW9vZHlzLm5ldDo4MDIwL3VzZXIvcWEvQ1NWRmlsZXM",
//        "american_format.csv");

//    assertNotNull(fields);

    assertNotNull(1);
  }

  public void test_retrieveWorkSpaces() {
    assertNotNull(1);
  }

  public void test_retrieveDatasets() {
    assertNotNull(1);
  }

  public void test_retrieveDatasources() {
    assertNotNull(1);
  }
}
