package com.lovtter.dg.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.sql.Date;

/**
 * Contains metadata describing an uploaded file.
 *
 * @author Anton.Telechev@moodys.com
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "UPLOAD")
public class Upload {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("id")
    private Integer id;

    @Column(name = "PATH", nullable = false, length = 256)
    @JsonProperty("path")
    private String path;

    @Column(name = "NAME", nullable = false, length = 64)
    @JsonProperty("name")
    private String name;

    @Column(name = "CHARSET", length = 32)
    @JsonProperty("charset")
    private String charset;

    @Column(name = "OWNER", length = 32)
    @JsonProperty("owner")
    private String owner;

    @Column(name = "EXPIRATION_DATE")
    @JsonProperty("expiration_date")
    private Date expirationDate;

    @Column(name = "UPLOAD_DATE", nullable = false)
    @JsonProperty("upload_date")
    private Date uploadDate;

    @Column(name = "VERSION", length = 32)
    @JsonProperty("version")
    private String version;

    @Column(name = "ACCESS_MODE", length = 32)
    @JsonProperty("access_mode")
    private String accessMode;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "REPORTING_DATE", nullable = true)
    @JsonProperty("reporting_date")
    private Date reportingDate;

    /**
     * Constructor.
     */
    public Upload() {
        this.path = null;
        this.name = null;
        this.charset = null;
        this.owner = null;
        this.expirationDate = null;
        this.uploadDate = null;
        this.version = null;
        this.accessMode = null;
        this.reportingDate = null;
    }

    /**
     * Getter for the {@code path} field.
     *
     * @return String the value of the field
     */
    public String getPath() {
        return this.path;
    }

    /**
     * Setter for the {@code path} field.
     *
     * @param uploadPath the value to set
     */
    public void setPath(String uploadPath) {
        this.path = uploadPath;
    }

    /**
     * Getter for the {@code name} field.
     *
     * @return String the value of the field
     */
    public String getName() {
        return this.name;
    }

    /**
     * Setter for the {@code name} field.
     *
     * @param uploadName the value to set
     */
    public void setName(String uploadName) {
        this.name = uploadName;
    }

    /**
     * Getter for the {@code charset} field.
     *
     * @return String the value of the field
     */
    public String getCharset() {
        return this.charset;
    }

    /**
     * Setter for the {@code charset} field.
     *
     * @param uploadCharset the value to set
     */
    public void setCharset(String uploadCharset) {
        this.charset = uploadCharset;
    }

    /**
     * Getter for the {@code owner} field.
     *
     * @return String the value of the field
     */
    public String getOwner() {
        return this.owner;
    }

    /**
     * Setter for the {@code owner} field.
     *
     * @param uploadOwner the value to set
     */
    public void setOwner(String uploadOwner) {
        this.owner = uploadOwner;
    }

    /**
     * Getter for the {@code expirationDate} field.
     *
     * @return Date the value of the field
     */
    public Date getExpirationDate() {
        return this.expirationDate;
    }

    /**
     * Setter for the {@code expirationDate} field.
     *
     * @param uploadExpirationDate the value to set
     */
    public void setExpirationDate(Date uploadExpirationDate) {
        this.expirationDate = uploadExpirationDate;
    }

    /**
     * Getter for the {@code uploadDate} field.
     *
     * @return Date the value of the field
     */
    public Date getUploadDate() {
        return this.uploadDate;
    }

    /**
     * Setter for the {@code uploadDate} field.
     *
     * @param dateOfUpload the value to set
     */
    public void setUploadDate(Date dateOfUpload) {
        this.uploadDate = dateOfUpload;
    }

    /**
     * Getter for the {@code version} field.
     *
     * @return String the value of the field
     */
    public String getVersion() {
        return this.version;
    }

    /**
     * Setter for the {@code version} field.
     *
     * @param uploadVersion the value to set
     */
    public void setVersion(String uploadVersion) {
        this.version = uploadVersion;
    }

    /**
     * Getter for the {@code accessMode} field.
     *
     * @return String the value of the field
     */
    public String getAccessMode() {
        return this.accessMode;
    }

    /**
     * Setter for the {@code accessMode} field.
     *
     * @param uploadAccessMode the value to set
     */
    public void setAccessMode(String uploadAccessMode) {
        this.accessMode = uploadAccessMode;
    }


    @JsonIgnore
    public String getFullPath() {
        return String.format("%s/%s", getPath(), getName());
    }

    public Date getReportingDate() {
        return reportingDate;
    }

    public void setReportingDate(Date reportingDate) {
        this.reportingDate = reportingDate;
    }


}
