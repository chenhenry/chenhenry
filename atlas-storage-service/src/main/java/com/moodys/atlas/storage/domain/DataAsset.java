package com.moodys.atlas.storage.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "DATA_ASSET")
public class DataAsset implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id_data_asset")
  private Long id;

  @JsonView(DataAssetJsonView.Summary.class)
  @Column(name = "name")
  private String name;

  @JsonView(DataAssetJsonView.Summary.class)
  @Column(name = "source_name")
  private String sourceName;

  @JsonView(DataAssetJsonView.Summary.class)
  @Column(name = "type")
  @Enumerated(EnumType.STRING)
  private DataAssetType type;

  @JsonView(DataAssetJsonView.Summary.class)
  @Column(name = "creator")
  private String creator;

  @JsonView(DataAssetJsonView.Summary.class)
  @Column(name = "create_time")
  private Date createTime;

  @JsonView(DataAssetJsonView.Summary.class)
  @Column(name = "description")
  private String description;

  @JsonView(DataAssetJsonView.Summary.class)
  @Column(name = "update_by")
  private String updateBy;

  @JsonView(DataAssetJsonView.Summary.class)
  @Column(name = "update_time")
  private Date updateTime;

  @OneToMany(mappedBy = "dataAsset", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<DataAssetField> fields;

  @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  @JoinColumn(name = "id_data_asset_structure")
  @JsonIgnoreProperties(value = { "handler", "hibernateLazyInitializer" })
  private DataAssetStructure structure;

  @OneToMany(mappedBy = "dataAsset", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<DataAssetLink> links;

  @JsonView(DataAssetJsonView.LinkCountSummary.class)
  @Transient
  private int linkCount;

  @JsonIgnore
  public DataAsset getSummary() {
    DataAsset summary = new DataAsset();
    summary.setCreateTime(this.getCreateTime());
    summary.setCreator(this.getCreator());
    summary.setDescription(this.getDescription());
    summary.setId(this.getId());
    summary.setName(this.getName());
    summary.setType(this.getType());
    summary.setUpdateBy(this.getUpdateBy());
    summary.setUpdateTime(this.getUpdateTime());
    return summary;
  }

  public List<DataAssetField> getFields() {
    return fields;
  }

  public void setFields(List<DataAssetField> fields) {
    fields.stream().forEach(field -> field.setDataAsset(this));
    this.fields = fields;
  }

  public DataAssetStructure getStructure() {
    return structure;
  }

  public void setStructure(DataAssetStructure structure) {
    this.structure = structure;
  }

  public Date getUpdateTime() {
    return updateTime;
  }

  public void setUpdateTime(Date updateTime) {
    this.updateTime = updateTime;
  }

  public String getUpdateBy() {
    return updateBy;
  }

  public void setUpdateBy(String updateBy) {
    this.updateBy = updateBy;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public DataAssetType getType() {
    return type;
  }

  public void setType(DataAssetType type) {
    this.type = type;
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

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public List<DataAssetLink> getLinks() {
    return links;
  }

  public void setLinks(List<DataAssetLink> links) {
    links.stream().forEach(link -> link.setDataAsset(this));
    this.links = links;
  }

  public int getLinkCount() {
    return getLinks() == null ? 0 : getLinks().size();
  }

  public String getSourceName() {
    return sourceName;
  }

  public void setSourceName(String sourceName) {
    this.sourceName = sourceName;
  }

  public boolean equals(Object o) {
    if (this == o) {
      return true;
    } else if (!(o instanceof DataAsset)) {
      return false;
    } else {
      DataAsset other = (DataAsset) o;
      return Objects.equals(this.name, other.name);
    }
  }

  public int hashCode() {
    return this.name != null ? this.name.hashCode() : 0;
  }

}