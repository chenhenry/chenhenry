package com.lovtter.dg.controller;


import com.lovtter.dg.domain.Upload;
import com.lovtter.dg.service.UploadsService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;

/**
 * Provides RESTful service for Upload objects.
 *
 * @author Anton.Telechev@moodys.com
 */
@RestController
@RequestMapping(path = "/lovtter/dg/upload")
@CrossOrigin
public class UploadsController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UploadsService.class);

    @Autowired
    private UploadedFileSaver uploadedFileSaver;

    @Autowired
    private UploadsService uploadsService;

    /**
     * Save a file sent using multipart form.
     *
     * @param uploadedInputStream the InputStream with uploaded contents
     * @param fileDetail          the uploaded file metadata
     * @return Response the metadata of the created Upload entry
     */
    @ApiOperation(value = "Creates a new Upload entry by uploading a file.")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "The metadata of the created Upload entry."),
            @ApiResponse(code = 403, message = "Invalid request data or unsupported operation.")})
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @RequestMapping(method = RequestMethod.POST, path = "/")
    public Upload uploadFile(
            @FormDataParam("file") InputStream uploadedInputStream,
            @FormDataParam("file") FormDataContentDisposition fileDetail) throws IOException {
        LOGGER.debug("Received new file {}, trying to save it", fileDetail.getName());
        return uploadsService.uploadFile(uploadedInputStream, fileDetail);
    }


    /**
     * Returns an Upload entry identified by its full path.
     *
     * @param fullPath the path to search
     * @return Response
     */
    @RequestMapping(method = RequestMethod.GET, path = "/{path}", produces = "application/json")
    public Upload getByPath(@PathVariable String fullPath) {
        Assert.hasText(fullPath, "You must provide a valid path");
        return uploadsService.getByPath(fullPath);
    }


    @RequestMapping(value = "/newDocument", method = RequestMethod.POST)
    public void UploadFile(MultipartHttpServletRequest request, HttpServletResponse response) {

        Iterator<String> itr = request.getFileNames();

        MultipartFile file = request.getFile(itr.next());

        String fileName = file.getOriginalFilename();
        System.out.println(fileName);
    }


}
