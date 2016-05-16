package com.moodys.atlas.storage.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moodys.atlas.common.datamodel.api.Workspace;
import com.moodys.atlas.storage.domain.DataAsset;
import com.moodys.atlas.storage.domain.DataAssetField;
import com.moodys.atlas.storage.domain.DataAssetLink;
import com.moodys.atlas.storage.domain.DataAssetLinkDataSetComp;
import com.moodys.atlas.storage.domain.DataAssetStructure;
import com.moodys.atlas.storage.domain.DataAssetType;
import com.moodys.atlas.storage.domain.builder.DataAssetBuilder;
import com.moodys.atlas.storage.domain.builder.DataAssetFieldBuilder;
import com.moodys.atlas.storage.domain.builder.DataAssetLinkBuilder;
import com.moodys.atlas.storage.domain.builder.DataAssetStructureBuilder;
import org.junit.FixMethodOrder;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class DataAssetControllerIT extends ApplicationTest {

  @Autowired
  private ObjectMapper jsonMapper;

  @Test
  public void test01_createDataAsset() throws Exception {
    DataAsset dataAsset = new DataAssetBuilder()
        .createTime(new Date())
        .creator("Iven")
        .description("mocked data asset 1")
        .name("asset1")
        .sourceName("hdfs-stream3-dev")
        .type(DataAssetType.CSV)
        .structure(
            new DataAssetStructureBuilder()
                .charset("UTF-8")
                .comment(true).delimiter(",")
                .escape("\\")
                .header(1)
                .nullValue("#$$#")
                .quote(",")
                .dataFormat("MM/dd/yyyy")
                .valueDelimiter("\"")
                .decimalSeparator(".")
                .delimiter("::").recordDelimiter("\r\n").build()
        ).fields(
        Arrays.asList(
            new DataAssetFieldBuilder().index(1).name("contractRef").type("STRING").nullable(false).build(),
            new DataAssetFieldBuilder().index(2).name("contractType").type("STRING").nullable(false).build()
        )).build();

    //serilize to json
    String json = jsonMapper.writeValueAsString(dataAsset);

    //post to create the data asset
    mockMvc.perform(post("/storage/dataassets/").contentType(MediaType.APPLICATION_JSON_UTF8).content(json))
        .andExpect(status().is2xxSuccessful());

    //retrieve the data asset

    ResultActions resultActions = mockMvc.perform(get("/storage/dataassets/hdfs-stream3-dev/asset1"));
    json = resultActions.andReturn().getResponse().getContentAsString();
    DataAsset newDataAsset = jsonMapper.readValue(json, DataAsset.class);
    DataAssetStructure structure = newDataAsset.getStructure();
    List<DataAssetField> fields = newDataAsset.getFields();

    assertNotNull(structure);
    assertNotNull(fields);
    assertTrue(fields.size() == 2);

    assertEquals("::", structure.getDelimiter());

  }

  @Test
  public void test02_getAllDataAssetSummary() throws Exception {

    ResultActions resultActions = mockMvc.perform(get("/storage/dataassets/"));

    String json = resultActions.andReturn().getResponse().getContentAsString();

    DataAsset dataAsset = jsonMapper.readValue(json, DataAsset[].class)[0];

    assertEquals("asset1", dataAsset.getName());
    assertNull(dataAsset.getLinks());
    assertNull(dataAsset.getFields());
    assertNull(dataAsset.getStructure());
  }

  @Test
  public void test03_getDataAssetDetail() throws Exception {
    ResultActions resultActions = mockMvc.perform(get("/storage/dataassets/hdfs-stream3-dev/asset1"));
    String json = resultActions.andReturn().getResponse().getContentAsString();

    DataAsset dataAsset = jsonMapper.readValue(json, DataAsset.class);

    assertEquals("asset1", dataAsset.getName());
    assertNotNull(dataAsset.getFields());
    assertNotNull(dataAsset.getStructure());

    DataAssetStructure structure = dataAsset.getStructure();
    assertEquals(true, structure.getComment());

    List<DataAssetField> fields = dataAsset.getFields();
    assertEquals(2, fields.size());
  }

  @Test
  public void test04_updateDataAssetSummary() throws Exception {

    ResultActions resultActions = mockMvc.perform(get("/storage/dataassets/hdfs-stream3-dev/asset1"));
    String json = resultActions.andReturn().getResponse().getContentAsString();
    DataAsset dataAsset = jsonMapper.readValue(json, DataAsset.class).getSummary();
    dataAsset.setDescription("mocked data asset 1(updated)");
    json = jsonMapper.writeValueAsString(dataAsset);

    mockMvc.perform(put("/storage/dataassets/hdfs-stream3-dev/asset1").contentType(MediaType.APPLICATION_JSON_UTF8).content(json))
        .andExpect(status().is2xxSuccessful());

    assertTrue(mockMvc.perform(get("/storage/dataassets/hdfs-stream3-dev/asset1")).andReturn().getResponse().getContentAsString().contains("(updated)"));
  }

  @Test
  public void test05_updateDataAssetStructure() throws Exception {
    ResultActions resultActions = mockMvc.perform(get("/storage/dataassets/hdfs-stream3-dev/asset1"));
    String json = resultActions.andReturn().getResponse().getContentAsString();
    DataAssetStructure structure = jsonMapper.readValue(json, DataAsset.class).getStructure();

    assertNotEquals(",", structure.getDelimiter());
    structure.setDelimiter(",");
    json = jsonMapper.writeValueAsString(structure);

    mockMvc.perform(put("/storage/dataassets/hdfs-stream3-dev/asset1/structure").contentType(MediaType.APPLICATION_JSON_UTF8).content(json))
        .andExpect(status().is2xxSuccessful());

    resultActions = mockMvc.perform(get("/storage/dataassets/hdfs-stream3-dev/asset1"));
    json = resultActions.andReturn().getResponse().getContentAsString();
    structure = jsonMapper.readValue(json, DataAsset.class).getStructure();

    assertEquals(",", structure.getDelimiter());

  }

  @Test
  public void test06_updateDataAssetFields() throws Exception {
    ResultActions resultActions = mockMvc.perform(get("/storage/dataassets/hdfs-stream3-dev/asset1"));
    String json = resultActions.andReturn().getResponse().getContentAsString();
    List<DataAssetField> fields = jsonMapper.readValue(json, DataAsset.class).getFields();

    assertEquals(2, fields.size());

    //add one field
    DataAssetField field = new DataAssetField();
    field.setIndex(3);
    field.setName("principal");
    field.setType("STRING");
    fields.add(field);

    json = jsonMapper.writeValueAsString(fields);

    mockMvc.perform(put("/storage/dataassets/hdfs-stream3-dev/asset1/fields").contentType(MediaType.APPLICATION_JSON_UTF8).content(json))
        .andExpect(status().is2xxSuccessful());

    //get updated asset1
    resultActions = mockMvc.perform(get("/storage/dataassets/hdfs-stream3-dev/asset1"));
    json = resultActions.andReturn().getResponse().getContentAsString();
    fields = jsonMapper.readValue(json, DataAsset.class).getFields();

    Boolean containsNewlyAdded = false;
    for (DataAssetField assetField : fields) {
      if (assetField.getName().equals("principal")) {
        containsNewlyAdded = true;
        break;
      }
    }
    assertTrue(containsNewlyAdded);
  }

  @Test
  public void test07_assignDataAssetLinks() throws Exception {
    List<DataAssetLink> links = Arrays.asList(
        new DataAssetLinkBuilder().createTime(new Date()).creator("Iven")
            .dataSetComp(new DataAssetLinkDataSetComp("hdfs-stream3-dev","Q1NWRmlsZXM", "american_format.csv" ))
            .description("test")
            .build()
    );

    //serilize to json
    String json = jsonMapper.writeValueAsString(links);

    mockMvc.perform(post("/storage/dataassets/hdfs-stream3-dev/asset1/data/").contentType(MediaType.APPLICATION_JSON_UTF8).content(json))
        .andExpect(status().is2xxSuccessful());
  }

  @Test
  public void test07_assignDataAssetLinks_withException() throws Exception {

    List<DataAssetLink> links = Arrays.asList(
        new DataAssetLinkBuilder().createTime(new Date()).creator("Iven")
            .dataSetComp(new DataAssetLinkDataSetComp("hdfs-stream3-dev","Q1NWRmlsZXM", "american_format.csv" ))
            .build()
    );

    //serilize to json
    String json = jsonMapper.writeValueAsString(links);

    mockMvc.perform(post("/storage/dataassets/hdfs-stream3-dev/asset100/data/").contentType(MediaType.APPLICATION_JSON_UTF8).content(json))
        .andExpect(status().isInternalServerError()).andExpect(content().string("{\"code\":500,\"status\":\"Internal Server Error\",\"message\":\"No data asset find by assetName: asset100, cannot add Asset Links on it\"}"));
  }

  @Test
  public void test09_getDataAssetLinks() throws Exception {
    ResultActions resultActions = mockMvc.perform(get("/storage/dataassets/hdfs-stream3-dev/asset1/data/"));
    String json = resultActions.andReturn().getResponse().getContentAsString();

    List<DataAssetLink> links = Arrays.asList(jsonMapper.readValue(json, DataAssetLink[].class));
    assertEquals(1, links.size());
    assertEquals("american_format.csv", links.get(0).getDataSetComp().getDataSet());
    assertEquals("hdfs-stream3-dev", links.get(0).getDataSetComp().getSourceName());
    assertEquals("Q1NWRmlsZXM", links.get(0).getDataSetComp().getWorkspace());

    assertEquals("Iven", links.get(0).getCreator());
    assertNotNull(links.get(0).getCreateTime());
    assertEquals("test", links.get(0).getDescription());
  }

  @Test
  public void test10_getDataAssetLinks_noData() throws Exception {
    ResultActions resultActions = mockMvc.perform(get("/storage/dataassets/hdfs-stream3-dev/asset100/data/"));
    String json = resultActions.andReturn().getResponse().getContentAsString();
    List<DataAssetLink> links = Arrays.asList(jsonMapper.readValue(json, DataAssetLink[].class));
    assertEquals(0, links.size());

  }

  @Test
  public void test11_unassignDataAssetLinks_noData() throws Exception {
    mockMvc.perform(delete("/storage/dataassets/hdfs-stream3-dev/asset1/data/Q1NWRmlsZXM/loan.csv")).andExpect(status().is2xxSuccessful());

    ResultActions resultActions = mockMvc.perform(get("/storage/dataassets/hdfs-stream3-dev/asset1/data/"));
    String json = resultActions.andReturn().getResponse().getContentAsString();

    List<DataAssetLink> links = Arrays.asList(jsonMapper.readValue(json, DataAssetLink[].class));
    assertEquals(1, links.size());

  }


  @Test
  public void test12_unassignDataAssetLinks() throws Exception {
    int beforeUnassign = test_getUnassignDatasets("hdfs-stream3-dev", "Q1NWRmlsZXM");
    mockMvc.perform(delete("/storage/dataassets/hdfs-stream3-dev/asset1/data/Q1NWRmlsZXM/american_format.csv")).andExpect(status().is2xxSuccessful());

    ResultActions resultActions = mockMvc.perform(get("/storage/dataassets/hdfs-stream3-dev/asset1/data/"));
    String json = resultActions.andReturn().getResponse().getContentAsString();

    List<DataAssetLink> links = Arrays.asList(jsonMapper.readValue(json, DataAssetLink[].class));
    assertEquals(0, links.size());
    int afterUnassign = test_getUnassignDatasets("hdfs-stream3-dev", "Q1NWRmlsZXM");
    assertEquals(1,  afterUnassign - beforeUnassign);
 }

  @Test
  public void test17_deleteDataAsset() throws Exception {
    mockMvc.perform(delete("/storage/dataassets/hdfs-stream3-dev/asset1")).andExpect(status().is2xxSuccessful());
    //try to retrieve asset1
    ResultActions resultActions = mockMvc.perform(get("/storage/dataassets/hdfs-stream3-dev/asset1"));
    String json = resultActions.andReturn().getResponse().getContentAsString();
    assertEquals("", json);
  }

  @Test
  @Ignore // as it will run a long time (about 7 mins)
  public void test18_importDataAssets() throws Exception {
    mockMvc.perform(post("/storage/dataassets/importDataAssets/").contentType(MediaType.APPLICATION_JSON_UTF8).content("RFO_STREAM3")).andExpect(status().is2xxSuccessful());
  }

  @Test
  public void test19_getUnassignDatasets() throws Exception {
    int unassign = test_getUnassignDatasets("hdfs-stream3-dev", "Q1NWRmlsZXM");
    assertNotEquals(0, unassign);
  }

  private int test_getUnassignDatasets(String sourceName, String workspace) throws Exception {

    ResultActions resultActions = mockMvc.perform(get("/storage/dataassets/"+sourceName+"/"+workspace+"/unassigned/"));
    String json = resultActions.andReturn().getResponse().getContentAsString();
    List<DataAssetLink> links = Arrays.asList(jsonMapper.readValue(json, DataAssetLink[].class));
    return links.size();
  }

  @Test
  public void test20_getWorkspaces() throws Exception {
    ResultActions resultActions = mockMvc.perform(get("/storage/dataassets/dataSources/hdfs-stream3-dev/workspaces/"));
    String json = resultActions.andReturn().getResponse().getContentAsString();
    Workspace[] workspaces =jsonMapper.readValue(json, Workspace[].class);
    assertNotEquals(0, workspaces.length);
  }
}
