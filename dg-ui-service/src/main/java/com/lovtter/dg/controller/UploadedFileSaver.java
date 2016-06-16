package com.lovtter.dg.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Saves file data from input stream to a temporary location.
 * 
 * @author Anton.Telechev@moodys.com
 *
 */
@Component
public class UploadedFileSaver {

  private static final Path TMP_FOLDER = Paths.get(System.getProperty("java.io.tmpdir"));

  @Value("${upload.tmp.prefix}")
  private String fileNamePrefix;

  /**
   * Stores the data from the specified input stream into a temporary file.<br>
   * Returns the full path to the stored file.
   * 
   * @param uploadedInputStream the stream to get file data from
   * @return Path the path where the file was saved
   * @throws IOException redirected from the underlying I/O instructions
   */
  public Path storeAsTmpFile(InputStream uploadedInputStream) throws IOException {
    final Path outputFile = TMP_FOLDER.resolve(getTmpUploadedFileName());
    try (OutputStream fos = Files.newOutputStream(outputFile);
        BufferedOutputStream bufferedOs = new BufferedOutputStream(fos)) {
      new StreamDumper().dumpStream(uploadedInputStream, bufferedOs);
    }
    return outputFile;
  }

  private String getTmpUploadedFileName() {
    return this.fileNamePrefix + System.currentTimeMillis();
  }
}
