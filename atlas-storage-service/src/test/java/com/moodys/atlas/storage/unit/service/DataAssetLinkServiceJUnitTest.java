package com.moodys.atlas.storage.unit.service;

import com.google.common.collect.Lists;
import com.moodys.atlas.storage.domain.*;
import com.moodys.atlas.storage.domain.builder.DataAssetBuilder;
import com.moodys.atlas.storage.domain.builder.DataAssetLinkBuilder;
import com.moodys.atlas.storage.repository.DataAssetLinkRepository;
import com.moodys.atlas.storage.service.DataAssetLinkService;
import com.moodys.atlas.storage.service.DataAssetService;
import com.moodys.atlas.storage.service.DataAssetValidationService;
import com.moodys.atlas.storage.service.impl.DataAssetLinkServiceImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.Date;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

/**
 * Created by pengx on 3/9/2016.
 */
@RunWith(MockitoJUnitRunner.class)
public class DataAssetLinkServiceJUnitTest {

  @InjectMocks
  private DataAssetLinkService service = new DataAssetLinkServiceImpl();

  @Mock
  private DataAssetService assetService;

  @Mock
  private DataAssetValidationService dataAssetValidationService;

  @Mock
  DataAssetLinkRepository assetLinkRepository;


  @Test
  public void testGetLinks(){
    String assetName = "test";
    String sourceName = "sourceName1";
    DataAsset asset = mockFindByName(assetName);

    List<DataAssetLink> links = service.getAssetLinks(sourceName, assetName);
    assertEquals(links, asset.getLinks());
  }

  @Test
  public void testGetLinksNull(){
    String assetName = "test100";
    String sourceName = "sourceName1";
    List<DataAssetLink> links = service.getAssetLinks(sourceName, assetName);
    assertEquals(0, links.size());
  }

  private DataAssetLink createNewLink(String creator, String sourceName, String workspace, String dataSet, String des, DataAssetLinkSource source) {
    DataAssetLinkBuilder builder = new DataAssetLinkBuilder();
    return builder.creator(creator)
        .description(des)
        .source(source)
        .dataSetComp(new DataAssetLinkDataSetComp(sourceName, workspace, dataSet))
        .build();
  }

  private DataAsset mockFindByName(String assetName) {
    List<DataAssetLink> linkList = Lists.newArrayList();
    linkList.add(createNewLink("henry", "sourceName2", "workspace2",  "/tmp/test2.csv", "test", DataAssetLinkSource.HDFS));
    linkList.add(createNewLink("henry", "sourceName4", "workspace4",  "/tmp/test4.csv", "test", DataAssetLinkSource.HDFS));
    String sourceName = "sourceName1";
    DataAsset asset = (new DataAssetBuilder()).links(linkList).build();
    when(assetService.findByName(sourceName, assetName)).thenReturn(asset);
    return asset;
  }


  @Test
  public void testAddLinks() {

    String assetName = "test";
    String sourceName = "sourceName1";
    List<DataAssetLink> links = Lists.newArrayList();
    DataAssetLink link1 = createNewLink("henry", "sourceName1", "workspace1",  "/tmp/test1.csv", "test1", DataAssetLinkSource.HDFS);
    DataAssetLink link2 = createNewLink("aven",   "sourceName2", "workspace2", "/tmp/test2.csv", "test2", DataAssetLinkSource.HDFS);
    DataAssetLink link3 = createNewLink("grace",  "sourceName3", "workspace3", "/tmp/test3.csv", "test3", DataAssetLinkSource.HDFS);

    links.add(link1);
    links.add(link2);
    links.add(link3);

    DataAsset asset = mockFindByName(assetName);
//    when(dataAssetValidationService.validateDatasetAssignment(assetName, link1)).thenReturn(true);
//    when(dataAssetValidationService.validateDatasetAssignment(assetName, link2)).thenReturn(true);
//    when(dataAssetValidationService.validateDatasetAssignment(assetName, link3)).thenReturn(true);

    service.addAssetLinks(sourceName, assetName, links);

    verify(dataAssetValidationService, times(1)).validateDatasetAssignment(sourceName, assetName, link1);
    verify(dataAssetValidationService, times(1)).validateDatasetAssignment(sourceName, assetName, link3);
    verify(dataAssetValidationService, times(0)).validateDatasetAssignment(sourceName, assetName, link2);

    assertEquals(4, asset.getLinks().size());

    verify(assetService, times(1)).update(asset);

  }

  @Test(expected = IllegalStateException.class)
  public void testAddAndGetLinks_exception() {
    String sourceName = "sourceName1";
    List<DataAssetLink> links = Lists.newArrayList();
    DataAssetLink link1 = createNewLink("henry", "sourceName1", "workspace1", "/tmp/test2.csv", "test2", DataAssetLinkSource.HDFS);
    DataAssetLink link2 = createNewLink("aven",  "sourceName1", "workspace1", "/tmp/test3.csv", "test3", DataAssetLinkSource.HDFS);

    links.add(link1);
    links.add(link2);
    try {
      service.addAssetLinks(sourceName, "asset100", links);
      fail();
    } catch (IllegalStateException e) {
      assertEquals("No data asset find by assetName: asset100, cannot add Asset Links on it", e.getMessage());
      throw e;
    }

  }

  @Test
  public void testDeleteLink() {
    String sourceName = "sourceName1";
    String assetName = "test";
    DataAsset asset = mockFindByName(assetName);

    when(assetLinkRepository.searchByAssetNameAndDataSetComp(assetName, asset.getLinks().get(0).getDataSetComp())).thenReturn(asset.getLinks().get(0));
    service.deleteAssetLink(sourceName, assetName, asset.getLinks().get(0).getDataSetComp());

    assertEquals(1, asset.getLinks().size());
    verify(assetService, times(1)).update(asset);

  }

  @Test
  public void testDeleteLink_noDelete() {
    String sourceName = "sourceName1";
    String assetName = "asset100";

    DataAssetLinkDataSetComp dataSetComp = new DataAssetLinkDataSetComp("source5", "workspace5", "/temp5.csv");
    service.deleteAssetLink(sourceName, "asset100", dataSetComp);
    verify(assetLinkRepository, never()).searchByAssetNameAndDataSetComp(assetName, dataSetComp);
    verify(assetService, never()).update(any(DataAsset.class));

    DataAsset asset = mockFindByName(assetName);
    when(assetLinkRepository.searchByAssetNameAndDataSetComp(assetName, asset.getLinks().get(0).getDataSetComp())).thenReturn(null);

    service.deleteAssetLink(sourceName, "asset100", dataSetComp);
    verify(assetLinkRepository, times(1)).searchByAssetNameAndDataSetComp(assetName, dataSetComp);
    verify(assetService, never()).update(any(DataAsset.class));


  }

  @Test
  public void testFindOneByDataSet() {
    DataAssetLinkDataSetComp dataSetComp = new DataAssetLinkDataSetComp("source5", "workspace5", "temp5.csv");
    DataAsset asset = (new DataAssetBuilder()).createTime(new Date()).creator("xuan").build();
    when(assetLinkRepository.findOneByDataSetComp(dataSetComp)).thenReturn((new DataAssetLinkBuilder()).creator("henry")
        .description("test")
        .source(DataAssetLinkSource.HDFS)
        .dataSetComp(dataSetComp)
        .dataAsset(asset)
        .build());

    DataAsset dataAsset = service.getDataAssetByDataSet(dataSetComp);
    assertNotNull(dataAsset);
    assertEquals(asset, dataAsset);

  }

  @Test
  public void testFindOneByDataSet_noData() {
    DataAsset dataAsset = service.getDataAssetByDataSet(new DataAssetLinkDataSetComp("source6", "workspace6", "temp6.csv"));
    assertNull(dataAsset);

  }
}
