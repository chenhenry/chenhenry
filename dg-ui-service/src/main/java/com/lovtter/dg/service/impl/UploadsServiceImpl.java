package com.lovtter.dg.service.impl;


import com.lovtter.dg.controller.UploadedFileSaver;
import com.lovtter.dg.domain.Upload;
import com.lovtter.dg.repository.UploadRepository;
import com.lovtter.dg.service.UploadsService;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.transaction.Transactional;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Date;

/**
 * Provides RESTful service for Upload objects.
 *
 * @author Anton.Telechev@moodys.com
 *
 */
@Service
@Transactional
public class UploadsServiceImpl implements UploadsService {

  private static final Logger LOGGER = LoggerFactory.getLogger(UploadsServiceImpl.class);

  @Autowired
  private UploadedFileSaver uploadedFileSaver;

  @Autowired
  private UploadRepository uploadRepository;

  /**
   * Save a file sent using multipart form.
   *
   * @param uploadedInputStream the InputStream with uploaded contents
   * @param fileDetail the uploaded file metadata
   * @return Response the metadata of the created Upload entry
   */
  @Override
  public Upload uploadFile(InputStream uploadedInputStream,FormDataContentDisposition fileDetail) throws IOException {
      LOGGER.debug("Received new file {}, trying to save it", fileDetail.getName());
    final java.nio.file.Path uploadedFile = uploadedFileSaver.storeAsTmpFile(uploadedInputStream);
    Upload upload = buildUpload(fileDetail);
    LOGGER.debug("File pushed in temporary space, now building upload and pushing to repository");
    LOGGER.debug("File path will be {} ", upload.getPath());
    upload = uploadRepository.save(upload);
    LOGGER.debug("Received '{}'. Saved as {}", upload, uploadedFile);
    //pushFileIntoHdfs(uploadedFile, upload);
    return upload;
  }

//  private void pushFileIntoHdfs(java.nio.file.Path uploadedFile, Upload upload) throws IOException {
//    assert upload != null;
//    assert uploadedFile != null;
//    final Thread fileSaverThread = new HdfsFileSaver.Builder().hdfsUrl(HDFS_URL).sourceFile(uploadedFile)
//        .targetFile(HDFS_UPLOADS_PATH, upload.getName()).build();
//    fileSaverThread.start();
//  }

  private Upload buildUpload(FormDataContentDisposition formData) {
    assert formData != null;
    final Upload upload = new Upload();
    final String targetFileName = String.format("%1$s.%2$s", formData.getFileName().replaceAll("\\s+", "_"),
        System.currentTimeMillis());
    upload.setName(targetFileName);
    upload.setUploadDate(new Date(System.currentTimeMillis()));
    upload.setAccessMode("rw");
    upload.setPath("");
    upload.setOwner("anybody");
    return upload;
  }

  /**
   * Returns an Upload entry identified by its full path.
   *
   * @param fullPath the path to search
   * @return Response
   */
  @Override
  public Upload getByPath(String fullPath) {
    Assert.hasText(fullPath, "You must provide a valid path");
    final int lastSlashIndex = fullPath.lastIndexOf("/");
    final String fileName = lastSlashIndex > -1 ? fullPath.substring(lastSlashIndex + 1) : fullPath;
    final String filePath = lastSlashIndex > -1 ? fullPath.substring(0, lastSlashIndex) : "";
    LOGGER.debug("Looking for {} in {}", fileName, filePath);
    Upload upload = uploadRepository.findOneByPathAndName(filePath, fileName);
    Assert.notNull(upload, "Unable to find upload for given path");
    LOGGER.debug("Found Upload by path '{}': {}", fullPath, upload);
    return upload;
  }

  private Upload getNotNullableUpload(int idUpload) {
    final Upload upload = uploadRepository.findOne(idUpload);
    Assert.notNull(upload, String.format("Unable to find requested upload with id=%1$s", idUpload));
    return upload;
  }
}
