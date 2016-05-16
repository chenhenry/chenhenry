package com.moodys.atlas.storage.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moodys.atlas.storage.Application;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.WebApplicationContext;

import java.io.IOException;

import static org.hamcrest.CoreMatchers.containsString;
import static org.junit.Assert.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by pengx on 3/2/2016.
 * Modified by henry on 3/4/2016
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(Application.class)
@WebIntegrationTest(randomPort = true)
@TestPropertySource("classpath:application.properties")
public class ApplicationTest {

  @Autowired
  public WebApplicationContext context;

  protected MockMvc mockMvc;

  protected RestTemplate restTemplate = new TestRestTemplate();

  @Before
  public void setupMockMvc() {
    mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
  }

  @Test(timeout = 60000)
  public void checkSwagger() throws Exception {
    ResultActions reActions = mockMvc.perform(get("/v2/api-docs"));
    // one approach to test response
    reActions.andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.parseMediaType("application/json;charset=UTF-8")))
        .andExpect(content().string(containsString("{\"swagger\":\"2.0\",")));
  }

  protected static <T> T deserializeOneFromJson(String json, Class<T> targetClass) {
    final ObjectMapper mapper = new ObjectMapper();
    try {
      return mapper.readValue(json, targetClass);
    } catch (IOException ex) {
      fail(String.format("JSON to Java deserialization failed: %1$s", ex.getMessage()));
      return null; // unreachable because fail() is just called, but still necessary...
    }
  }


}