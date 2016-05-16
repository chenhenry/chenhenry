package com.moodys.atlas.storage.unit.service;

import com.google.common.collect.Lists;
import com.moodys.atlas.storage.domain.DataAsset;
import com.moodys.atlas.storage.domain.DataAssetField;
import com.moodys.atlas.storage.domain.DataAssetStructure;
import com.moodys.atlas.storage.domain.DataAssetType;
import com.moodys.atlas.storage.domain.builder.DataAssetBuilder;
import com.moodys.atlas.storage.domain.builder.DataAssetFieldBuilder;
import com.moodys.atlas.storage.domain.builder.DataAssetStructureBuilder;
import com.moodys.atlas.storage.exception.InvalidDataAssetChangeException;
import com.moodys.atlas.storage.repository.DataAssetRepository;
import com.moodys.atlas.storage.service.DataAssetService;
import com.moodys.atlas.storage.service.DataAssetValidationService;
import com.moodys.atlas.storage.service.impl.DataAssetServiceImpl;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.runners.MockitoJUnitRunner;
import org.mockito.stubbing.Answer;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class DataAssetServiceJUnitTest {

  @InjectMocks
  private DataAssetService dataAssetService = new DataAssetServiceImpl();

  @Mock
  private DataAssetRepository dataAssetRepository;

  @Mock
  private DataAssetValidationService dataAssetValidationService;

  @Test
  public void test_create() {
    DataAsset dataAsset = new DataAssetBuilder()
        .createTime(new Date()).creator("Iven").sourceName("sourceName")
        .description("mocked data asset 1")
        .name("asset1").type(DataAssetType.CSV)
        .structure(new DataAssetStructureBuilder().charset("UTF-8").dataFormat("YYYY-MM-dd").decimalSeparator(",").delimiter(",").header(0).build())
        .build();
    dataAssetService.create(dataAsset);
    verify(dataAssetRepository, times(1)).save(dataAsset);
  }

  @Test
  public void test_saveDataAsset() {
    DataAsset dataAsset1 = new DataAssetBuilder()
        .createTime(new Date()).creator("Iven")
        .description("mocked data asset 1").name("asset1").sourceName("sourceName").type(DataAssetType.CSV).build();
    DataAsset dataAsset2 = new DataAssetBuilder()
        .createTime(new Date()).creator("Iven")
        .description("mocked data asset 2").name("asset2").sourceName("sourceName").type(DataAssetType.CSV).build();
    List<DataAsset> dataAssets = Lists.newArrayList();
    dataAssets.add(dataAsset1);
    dataAssets.add(dataAsset2);
    dataAssetService.create(dataAssets);
    verify(dataAssetRepository, times(1)).save(dataAssets);
  }

  @Test
  public void test_findByName() {
    when(dataAssetRepository.findBySourceNameAndName("sourceName", "asset1")).thenReturn(
        new DataAssetBuilder()
            .createTime(new Date()).creator("Iven")
            .description("mocked data asset 1").name("asset1").sourceName("sourceName").type(DataAssetType.CSV).build());
    DataAsset dataAsset = dataAssetService.findByName("sourceName", "asset1");
    verify(dataAssetRepository, times(1)).findBySourceNameAndName("sourceName", "asset1");
    assertNotNull(dataAsset);
    assertEquals("asset1", dataAsset.getName());
  }

  @Test
  public void test_findAll() {

    when(dataAssetRepository.findAll()).thenReturn(
        Arrays.asList(
            new DataAssetBuilder()
                .createTime(new Date()).creator("Iven")
                .description("mocked data asset 1").name("asset1").sourceName("sourceName").type(DataAssetType.CSV).build(),
            new DataAssetBuilder()
                .createTime(new Date()).creator("Iven")
                .description("mocked data asset 2").name("asset2").sourceName("sourceName").type(DataAssetType.CSV).build()
        ));

    Iterable<DataAsset> assets = dataAssetService.findAll();
    verify(dataAssetRepository, times(1)).findAll();
  }

  @Test
  public void test_deleteByName() {
    doAnswer(new Answer() {
      @Override
      public Object answer(InvocationOnMock invocation) throws Throwable {
        Object[] args = invocation.getArguments();
        System.out.println("called delete() with arguments: " + Arrays.toString(args));
        return null;
      }
    }).when(dataAssetRepository).deleteBySourceNameAndName("sourceName", "asset1");

    dataAssetService.delete("sourceName", "asset1");
    verify(dataAssetRepository, times(1)).deleteBySourceNameAndName("sourceName", "asset1");
  }

  @Test
  public void test_deleteBySourceName() {
    doAnswer(new Answer() {
      @Override
      public Object answer(InvocationOnMock invocation) throws Throwable {
        Object[] args = invocation.getArguments();
        System.out.println("called delete() with arguments: " + Arrays.toString(args));
        return null;
      }
    }).when(dataAssetRepository).deleteBySourceName("asset1");

    dataAssetService.deleteBySourceName("asset1");
    verify(dataAssetRepository, times(1)).deleteBySourceName("asset1");
  }


  @Test
  public void test_deleteDataAssetObject() {

    DataAsset dataAsset = new DataAssetBuilder()
        .createTime(new Date()).creator("Iven")
        .description("mocked data asset 1").name("asset1").sourceName("sourceName").type(DataAssetType.CSV).build();

    doAnswer(new Answer() {
      @Override
      public Object answer(InvocationOnMock invocation) throws Throwable {
        Object[] args = invocation.getArguments();
        System.out.println("called delete() with arguments: " + Arrays.toString(args));
        return null;
      }
    }).when(dataAssetRepository).deleteBySourceNameAndName("sourceName", "asset1");

    dataAssetService.delete(dataAsset);
    verify(dataAssetRepository, times(1)).delete(dataAsset);
  }

  @Test(expected = InvalidDataAssetChangeException.class)
  @Ignore
  public void test_updateDataAssetStructure() {
    DataAssetStructure structure = new DataAssetStructureBuilder().delimiter(",").build();
    Mockito.doNothing().when(dataAssetValidationService).validateDataAssetStructureUpdate("sourceName", "asset1", new DataAssetStructureBuilder().delimiter(",").build());
    Mockito.doThrow(new InvalidDataAssetChangeException("The field separator does not match the assigned file(s)")).when(dataAssetValidationService)
        .validateDataAssetStructureUpdate("sourceName", "asset2", structure);

    DataAsset dataAsset2 = new DataAssetBuilder()
        .createTime(new Date()).creator("Iven")
        .description("mocked data asset 2").name("asset2").sourceName("sourceName").type(DataAssetType.CSV).build();

    DataAsset dataAsset1 = new DataAssetBuilder()
        .createTime(new Date()).creator("Iven")
        .description("mocked data asset 1").name("asset1").sourceName("sourceName").type(DataAssetType.CSV).build();

    when(dataAssetRepository.findBySourceNameAndName("sourceName", "asset1")).thenReturn(dataAsset1);
    when(dataAssetRepository.findBySourceNameAndName("sourceName", "asset2")).thenReturn(dataAsset2);

    dataAssetService.updateDataAssetStructure("sourceName", "asset1", structure);
    verify(dataAssetRepository, times(1)).deleteBySourceNameAndName("sourceName", "asset1");
    verify(dataAssetRepository, times(1)).save(dataAsset1);

    dataAssetService.updateDataAssetStructure("sourceName", "asset2", structure);
    verifyNoMoreInteractions(dataAssetRepository);
  }

  @Test(expected = InvalidDataAssetChangeException.class)
  public void test_updateDataAssetFields() {
    List<DataAssetField> fieldList = Arrays.asList(
        new DataAssetFieldBuilder().index(1).name("contractRef").type("STRING").nullable(false).build(),
        new DataAssetFieldBuilder().index(2).name("pd").type("FLOAT").nullable(false).build(),
        new DataAssetFieldBuilder().index(3).name("maturityDate").type("DATE").nullable(false).build(),
        new DataAssetFieldBuilder().index(4).name("balance").type("FLOAT").nullable(false).build(),
        new DataAssetFieldBuilder().index(8).name("attrib1").type("STRING").nullable(true).build()
    );

    DataAsset dataAsset1 = new DataAssetBuilder()
        .createTime(new Date()).creator("Iven")
        .description("mocked data asset 1").name("asset1").sourceName("sourceName").type(DataAssetType.CSV).build();

    DataAsset dataAsset2 = new DataAssetBuilder()
        .createTime(new Date()).creator("Iven")
        .description("mocked data asset 2").name("asset2").sourceName("sourceName").type(DataAssetType.CSV).build();

    Mockito.doNothing().when(dataAssetValidationService).validateDataAssetFieldsUpdate("sourceName", "asset1", fieldList);
    Mockito.doThrow(new InvalidDataAssetChangeException("The data type of the field do not match the assigned files."))
        .when(dataAssetValidationService).validateDataAssetFieldsUpdate("sourceName", "asset2", fieldList);

    when(dataAssetRepository.findBySourceNameAndName("sourceName", "asset1")).thenReturn(dataAsset1);
    when(dataAssetRepository.findBySourceNameAndName("sourceName", "asset2")).thenReturn(dataAsset2);

    dataAssetService.updateDataAssetFields("sourceName", "asset1", fieldList);
    verify(dataAssetRepository, times(1)).findBySourceNameAndName("sourceName", "asset1");
    verify(dataAssetRepository, times(1)).save(dataAsset1);

    dataAssetService.updateDataAssetFields("sourceName", "asset2", fieldList);
    verifyNoMoreInteractions(dataAssetRepository);
  }

  @Test
  public void test_updateDataAssetSummary() {
    DataAsset asset1 = new DataAssetBuilder().description("updated").build();
    when(dataAssetRepository.findBySourceNameAndName("sourceName", "asset1")).thenReturn(asset1);

    dataAssetService.updateDataAssetSummary("sourceName", "asset1", asset1);
    verify(dataAssetRepository).findBySourceNameAndName("sourceName", "asset1");
    verify(dataAssetRepository).save(asset1);
  }

}
