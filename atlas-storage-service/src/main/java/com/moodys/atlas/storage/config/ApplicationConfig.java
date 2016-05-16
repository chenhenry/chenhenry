package com.moodys.atlas.storage.config;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfig {

  @Bean
  public ObjectMapper jsonMapper() {
    ObjectMapper jsonMapper = new ObjectMapper();
    jsonMapper.registerModule(new JavaTimeModule());
    jsonMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
    //need to disable it to allow @JsonView work in @RestController
    jsonMapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION);
    jsonMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    return jsonMapper;
  }
}
