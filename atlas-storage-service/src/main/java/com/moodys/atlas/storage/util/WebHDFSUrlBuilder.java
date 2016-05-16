package com.moodys.atlas.storage.util;

import java.util.Formatter;
import java.util.Locale;

/**
 * Created by pengx on 2/24/2016.
 */
public class WebHDFSUrlBuilder {

  public WebHDFSUrlBuilder(String httpUrl, String path, String operation, String hadoopUser) {
    urlBuilder = new StringBuilder();
    Formatter formatter = new Formatter(urlBuilder, Locale.US);
    formatter.format("%s%s?op=%s&user.name=%s", httpUrl, path, operation, hadoopUser);
  }

  private final StringBuilder urlBuilder;

  public String getUrlString() {
    return urlBuilder.toString();
  }
}
