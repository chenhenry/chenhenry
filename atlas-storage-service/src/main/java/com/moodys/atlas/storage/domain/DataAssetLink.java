package com.moodys.atlas.storage.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by pengx on 3/4/2016.
 */
@Entity
@Table(name = "DATA_ASSET_LINK")
public class DataAssetLink {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id_data_asset_link")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_data_asset")
  @JsonIgnore
  private DataAsset dataAsset;

  @Column(name = "source")
  private DataAssetLinkSource source;

  @Embedded
  private DataAssetLinkDataSetComp dataSetComp;

  @Column(name = "description")
  private String description;

  @Column(name = "creator")
  private String creator;

  @Column(name="create_time")
  private Date createTime;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public DataAsset getDataAsset() {
    return dataAsset;
  }

  public void setDataAsset(DataAsset dataAsset) {
    this.dataAsset = dataAsset;
  }

  public DataAssetLinkSource getSource() {
    return source;
  }

  public void setSource(DataAssetLinkSource source) {
    this.source = source;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getCreator() {
    return creator;
  }

  public void setCreator(String creator) {
    this.creator = creator;
  }

  public Date getCreateTime() {
    return createTime;
  }

  public void setCreateTime(Date createTime) {
    this.createTime = createTime;
  }

  public DataAssetLinkDataSetComp getDataSetComp() {
    return dataSetComp;
  }

  public void setDataSetComp(DataAssetLinkDataSetComp dataSetComp) {
    this.dataSetComp = dataSetComp;
  }
}
