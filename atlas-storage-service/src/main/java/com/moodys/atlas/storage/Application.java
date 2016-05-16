package com.moodys.atlas.storage;

/**
 * Created by pengx on 1/21/2016.
 */

import com.google.common.base.Predicate;
import com.google.common.base.Predicates;
import org.apache.catalina.connector.Connector;
import org.apache.coyote.http11.Http11NioProtocol;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.hateoas.HypermediaAutoConfiguration;
import org.springframework.boot.context.embedded.EmbeddedServletContainerFactory;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import springfox.documentation.RequestHandler;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


@SpringBootApplication
@EnableAutoConfiguration(exclude = {HypermediaAutoConfiguration.class})
@EnableSwagger2
public class Application {

  @Value("${ssl.enabled}")
  private String sslEnabled;

  @Value("${ssl.port}")
  private String sslPort;

  @Value("${ssl.keystorePath}")
  private String sslKeystore;

  @Value("${ssl.keystorePassword}")
  private String sslKeystorePassword;

  @Value("${ssl.keystoreType}")
  private String sslKeystoreType;

  @Value("${ssl.keystoreAlias}")
  private String sslKeystoreAlias;

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }

  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurerAdapter() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/storage/**").allowedMethods("GET","PUT","DELETE","POST","HEAD");
      }
    };
  }

  @Bean
  public Docket newsApi() {

    return new Docket(DocumentationType.SWAGGER_2)
        .apiInfo(apiInfo())
        .select()
        .apis(apis())
        .build();
  }

  private Predicate<RequestHandler> apis() {
    return Predicates.not(RequestHandlerSelectors.basePackage("org.springframework.boot"));
  }

  private ApiInfo apiInfo() {
    return new ApiInfoBuilder()
        .title("Atlas Storage")
        .description("Atlas Storage")
        .contact("MA-ERSAtlas-Stream3@moodys.com")
        .version("1.0")
        .build();
  }

  @Bean
  public EmbeddedServletContainerFactory embeddedServletContainerFactory() {

    TomcatEmbeddedServletContainerFactory tomcat = new TomcatEmbeddedServletContainerFactory();

    if(Boolean.parseBoolean(sslEnabled)) {
      tomcat.addAdditionalTomcatConnectors(createHttpsConnector());
    }
    return tomcat;
  }

  private Connector createHttpsConnector() {
    Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");

    connector.setScheme("https");
    connector.setPort(Integer.parseInt(sslPort));
    connector.setSecure(true);

    Http11NioProtocol protocol = (Http11NioProtocol) connector.getProtocolHandler();
    protocol.setSSLEnabled(Boolean.parseBoolean(sslEnabled));

    protocol.setKeystoreFile(sslKeystore);
    protocol.setKeystorePass(sslKeystorePassword);
    protocol.setKeystoreType(sslKeystoreType);
    protocol.setKeyAlias(sslKeystoreAlias);

    return connector;
  }

}