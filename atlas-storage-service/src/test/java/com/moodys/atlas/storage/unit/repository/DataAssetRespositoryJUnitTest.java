package com.moodys.atlas.storage.unit.repository;


import com.moodys.atlas.storage.UnitTestConfiguration;
import com.moodys.atlas.storage.domain.DataAsset;
import com.moodys.atlas.storage.domain.DataAssetField;
import com.moodys.atlas.storage.domain.DataAssetStructure;
import com.moodys.atlas.storage.domain.DataAssetType;
import com.moodys.atlas.storage.repository.DataAssetRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(UnitTestConfiguration.class)
@TestPropertySource("classpath:application.properties")
public class DataAssetRespositoryJUnitTest {
  @Autowired
  private DataAssetRepository dataAssetRepository;



  public DataAsset mockDataAsset() {
    //add a new DataAsset.
    DataAsset dataAsset = new DataAsset();
    dataAsset.setCreateTime(new Date());
    dataAsset.setCreator("Iven");
    dataAsset.setDescription("mocked data asset 1");
    dataAsset.setName("asset1");
    dataAsset.setSourceName("rfo");
    dataAsset.setType(DataAssetType.CSV);

    DataAssetStructure structure = new DataAssetStructure();
    structure.setCharset("UTF-8");
    structure.setComment(true);
    structure.setDelimiter(",");
    structure.setEscape("Yes");
    structure.setHeader(0);
    structure.setNullValue("");
    structure.setQuote("'");
    dataAsset.setStructure(structure);

    List<DataAssetField> fields = new ArrayList<>();

    DataAssetField field1 = new DataAssetField();
    field1.setDataAsset(dataAsset);
    field1.setIndex(0);
    field1.setName("name");
    field1.setType("string");

    DataAssetField field2 = new DataAssetField();
    field2.setDataAsset(dataAsset);
    field2.setIndex(1);
    field2.setName("outstanding");
    field2.setType("number");

    fields.add(field1);
    fields.add(field2);

    dataAsset.setFields(fields);

    return dataAsset;

  }

  @Test
  @Transactional
  public void test_findByName() {
    dataAssetRepository.save(mockDataAsset());
    DataAsset asset = dataAssetRepository.findBySourceNameAndName("rfo", "asset1");
    assertNotNull(asset);
  }

  @Test
  @Transactional
  public void test_deleteByName() {
    dataAssetRepository.save(mockDataAsset());
    assertNotNull(dataAssetRepository.findBySourceNameAndName("rfo", "asset1"));
    dataAssetRepository.deleteBySourceNameAndName("rfo", "asset1");
    DataAsset asset = dataAssetRepository.findBySourceNameAndName("rfo", "asset1");
    assertNull(asset);
  }

  @Test
  @Transactional
  public void test_deleteBySourceName() {
    dataAssetRepository.save(mockDataAsset());
    assertNotNull(dataAssetRepository.findBySourceNameAndName("rfo", "asset1"));
    dataAssetRepository.deleteDataAssetFieldsBySourceName("rfo");
    dataAssetRepository.deleteBySourceName("rfo");
    DataAsset asset = dataAssetRepository.findBySourceNameAndName("rfo", "asset1");
    assertNull(asset);
  }

}
