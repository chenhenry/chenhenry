package com.moodys.atlas.storage.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moodys.atlas.storage.domain.DataAsset;
import com.moodys.atlas.storage.domain.DataAssetType;
import com.moodys.atlas.storage.domain.builder.DataAssetBuilder;
import com.moodys.atlas.storage.domain.builder.DataAssetFieldBuilder;
import com.moodys.atlas.storage.domain.builder.DataAssetStructureBuilder;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by pengx on 5/9/2016.
 */
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class UIServicesControllerIT extends ApplicationTest {
  @Autowired
  private ObjectMapper jsonMapper;

  @Test
  public void test01_createDataAsset() throws Exception {
    DataAsset dataAsset = new DataAssetBuilder()
        .createTime(new Date())
        .creator("Iven")
        .description("mocked data asset 1")
        .sourceName("hdfs-stream3-dev")
        .name("asset1")
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

  }

  @Test
  public void test02_getDataStructures() throws Exception {
    ResultActions resultActions = mockMvc.perform(get("/storage/ui/dataStructuresSummary/hdfs-stream3-dev/CSV/"));
    String json = resultActions.andReturn().getResponse().getContentAsString();
    List<DataAsset> assets = Arrays.asList(jsonMapper.readValue(json, DataAsset[].class));
    assertEquals(1, assets.size());

  }

  @Test
  public void test02_getDataStructures_02() throws Exception {
    ResultActions resultActions = mockMvc.perform(get("/storage/ui/dataStructuresSummary/hdfs-stream3-dev/ORACLE/"));
    String json = resultActions.andReturn().getResponse().getContentAsString();
    List<DataAsset> assets = Arrays.asList(jsonMapper.readValue(json, DataAsset[].class));
    assertEquals(0, assets.size());

  }

  @Test
  public void test10_deleteDataAsset() throws Exception {
    mockMvc.perform(delete("/storage/dataassets/hdfs-stream3-dev/asset1")).andExpect(status().is2xxSuccessful());
    //try to retrieve asset1
    ResultActions resultActions = mockMvc.perform(get("/storage/dataassets/hdfs-stream3-dev/asset1"));
    String json = resultActions.andReturn().getResponse().getContentAsString();
    assertEquals("", json);
  }


}
