package com.lovtter.dg.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Objects;

/**
 * Utility that dumps the input from the specified input stream into an output stream.
 * 
 * @author Anton.Telechev@moodys.com
 *
 */
public class StreamDumper {

  private static final Logger LOGGER = LoggerFactory.getLogger(StreamDumper.class);

  private static final int BUFFER_SIZE = 2048;

  /**
   * Constructor.
   */
  public StreamDumper() {
    // nothing
  }

  /**
   * Dumps the contents of the specified input stream into the specified output stream.
   * 
   * @param inputStream the input stream to take data from
   * @param outputStream the output stream to put data into
   * @throws IOException redirected from the underlying calls
   * @throws NullPointerException if of one the args is null
   */
  public void dumpStream(InputStream inputStream, OutputStream outputStream) throws IOException {
    Objects.requireNonNull(inputStream, "inputStream must not be null");
    Objects.requireNonNull(outputStream, "outputStream must not be null");
    final byte[] buffer = new byte[BUFFER_SIZE];
    int bytesCount = inputStream.read(buffer);
    int totalBytes = bytesCount;
    while (bytesCount > -1) {
      outputStream.write(buffer, 0, bytesCount);
      bytesCount = inputStream.read(buffer);
      totalBytes += bytesCount;
    }
    outputStream.flush();
    LOGGER.debug(String.format("%1$s byte(s) written into the output stream.", totalBytes));
  }
}
