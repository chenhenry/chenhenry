package com.lovtter.dg.service;


import com.lovtter.dg.domain.Upload;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;

import java.io.IOException;
import java.io.InputStream;

/**
 * Provides RESTful service for Upload objects.
 *
 * @author Anton.Telechev@moodys.com
 */

public interface UploadsService {


    Upload uploadFile(InputStream uploadedInputStream, FormDataContentDisposition fileDetail) throws IOException;


    Upload getByPath(String fullPath);

}
