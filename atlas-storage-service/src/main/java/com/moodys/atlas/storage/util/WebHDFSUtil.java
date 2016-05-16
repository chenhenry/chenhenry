package com.moodys.atlas.storage.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by pengx on 2/24/2016.
 */
public class WebHDFSUtil {

  private static final Logger LOGGER = LoggerFactory.getLogger(WebHDFSUtil.class);

  public static String run(String urlPath) throws IOException {
    BufferedReader reader = null;
    String result = null;
    StringBuffer sbf = new StringBuffer();
    try {
      URL url = new URL(urlPath);
      LOGGER.debug("WebHDFS url: {}", url.toString());

      HttpURLConnection connection = (HttpURLConnection) url
          .openConnection();
      connection.setRequestMethod("GET");
      connection.connect();
      InputStream is = connection.getInputStream();
      reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
      String strRead = null;
      while ((strRead = reader.readLine()) != null) {
        sbf.append(strRead);
      }
      reader.close();
      is.close();
      result = sbf.toString();
    } catch (IOException e) {
      throw e;
    }
    return result;
  }

  public static String formatPath(String path) throws IOException {
    if(path.startsWith("%2F")){
      return path.substring("%2F".length());
    }
    return path;
  }
}
