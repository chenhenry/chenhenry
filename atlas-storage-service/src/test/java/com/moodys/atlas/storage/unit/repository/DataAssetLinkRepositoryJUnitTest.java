package com.moodys.atlas.storage.unit.repository;

import com.google.common.collect.Lists;
import com.moodys.atlas.storage.UnitTestConfiguration;
import com.moodys.atlas.storage.domain.*;
import com.moodys.atlas.storage.domain.builder.DataAssetLinkBuilder;
import com.moodys.atlas.storage.repository.DataAssetLinkRepository;
import com.moodys.atlas.storage.repository.DataAssetRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Date;
import java.util.List;

import static org.junit.Assert.*;

/**
 * Created by pengx on 3/9/2016.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(UnitTestConfiguration.class)
@TestPropertySource("classpath:application.properties")
@javax.transaction.Transactional
public class DataAssetLinkRepositoryJUnitTest {
  @Autowired
  private DataAssetRepository assetRepository;

  @Autowired
  private DataAssetLinkRepository repository;

  DataAsset asset;
  DataAssetLink link;

  @Before
  public void setup() {
    List<DataAssetLink> links = Lists.newArrayList();

    link = createNewLink("xuan", new Date(), "source1", "workspace1", "/tmp/test1.csv", "test 1", DataAssetLinkSource.HDFS);
    links.add(link);

    asset = new DataAsset();
    link.setDataAsset(asset);
    asset.setSourceName("source1");
    asset.setCreateTime(new Date());
    asset.setCreator("xuan");
    asset.setName("TEST");
    asset.setType(DataAssetType.CSV);
    asset.setLinks(links);

    assetRepository.save(asset);
  }

  private DataAssetLink createNewLink(String creator, Date date, String sourceName, String workspace, String dataSet, String des, DataAssetLinkSource source) {
    DataAssetLinkBuilder builder = new DataAssetLinkBuilder();
    return builder.creator(creator)
        .description(des)
        .source(source)
        .createTime(date)
        .dataSetComp(new DataAssetLinkDataSetComp(sourceName, workspace, dataSet))
        .build();
  }


  @Test
  public void testSearchByCriteria() {
    DataAssetLink reLink = repository.searchByAssetNameAndDataSetComp(asset.getName(), link.getDataSetComp() );
    assertNotNull(reLink.getDataAsset());

    assertLinkEquals(link, reLink);

    assertEquals(asset.getName(), reLink.getDataAsset().getName());
    assertEquals(asset.getType(), reLink.getDataAsset().getType());
    assertEquals(asset.getCreator(), reLink.getDataAsset().getCreator());

  }

  private void assertLinkEquals(DataAssetLink link, DataAssetLink reLink) {
    assertEquals(link.getCreateTime(), reLink.getCreateTime());
    assertEquals(link.getCreator(), reLink.getCreator());
    assertEquals(link.getDataSetComp(), reLink.getDataSetComp());
    assertEquals(link.getDescription(), reLink.getDescription());

  }

  @Test
  public void testDeleteByLink() {
    assertNotNull(repository.findOne(link.getId()));
    repository.delete(link);
    assertNull(repository.findOne(link.getId()));

  }

  @Test
  public void testAddLinks() {
    List<DataAssetLink> links = Lists.newArrayList();
    DataAssetLink link1 = createNewLink("henry", new Date(), "source1", "workspace1", "/tmp/test2.csv", "test2", DataAssetLinkSource.HDFS);
    link1.setDataAsset(asset);
    DataAssetLink link2 = createNewLink("aven", new Date(), "source1", "workspace1", "/tmp/test3.csv", "test3", DataAssetLinkSource.HDFS);
    link2.setDataAsset(asset);
    links.add(link1);
    links.add(link2);

    repository.save(links);
    DataAssetLink relink1 = repository.searchByAssetNameAndDataSetComp(asset.getName(), link1.getDataSetComp() );
    assertNotNull(relink1);
    assertLinkEquals(link1, relink1);
    DataAssetLink relink2 = repository.searchByAssetNameAndDataSetComp(asset.getName(), link2.getDataSetComp() );
    assertNotNull(relink2);
    assertLinkEquals(link2, relink2);
  }

  @Test
  public void testFindOneByDataSet() {
    DataAssetLink reLink = repository.findOneByDataSetComp(link.getDataSetComp());
    assertNotNull(reLink);
    assertLinkEquals(link, reLink);
  }

  @Test
  public void testDeleteDataAssetLinksBySourceName() {
    assertNotNull(repository.findOne(link.getId()));
    repository.deleteDataAssetLinksBySourceName("source1");
    assertNull(repository.findOneByDataSetComp(link.getDataSetComp()));
  }

}
