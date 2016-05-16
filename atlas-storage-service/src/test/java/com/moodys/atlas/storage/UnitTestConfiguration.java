package com.moodys.atlas.storage;


import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.hateoas.HypermediaAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableAutoConfiguration(exclude = {HypermediaAutoConfiguration.class})
@ComponentScan(basePackages = {"com.moodys.atlas.storage.repository", "com.moodys.atlas.storage.service", "com.moodys.atlas.storage.domain" })
@Configuration
public class UnitTestConfiguration {

}