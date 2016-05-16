package com.moodys.atlas.storage.domain;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.TableGenerator;
import javax.persistence.Transient;

/**
 * Created by pengx on 3/22/2016.
 */
@Embeddable
public class DataAssetLinkDataSetComp {

  public DataAssetLinkDataSetComp() {

  }

  public DataAssetLinkDataSetComp(String sourceName, String workspace, String dataSet) {
    this.sourceName = sourceName;
    this.workspace = workspace;
    this.dataSet = dataSet;
  }

  @Column(name = "source_name")
  private String sourceName;

  @Column(name = "workspace")
  private String workspace;

  @Column(name = "dataset")
  private String dataSet;

  @Transient
  private String path;

  public String getDataSet() {
    return dataSet;
  }

  public void setDataSet(String dataSet) {
    this.dataSet = dataSet;
  }

  public String getSourceName() {
    return sourceName;
  }

  public void setSourceName(String sourceName) {
    this.sourceName = sourceName;
  }

  public String getWorkspace() {
    return workspace;
  }

  public void setWorkspace(String workspace) {
    this.workspace = workspace;
  }

  public String getPath() {
    return path;
  }

  public void setPath(String path) {
    this.path = path;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    DataAssetLinkDataSetComp that = (DataAssetLinkDataSetComp) o;

    if (sourceName != null ? !sourceName.equals(that.sourceName) : that.sourceName != null) return false;
    if (workspace != null ? !workspace.equals(that.workspace) : that.workspace != null) return false;
    return dataSet != null ? dataSet.equals(that.dataSet) : that.dataSet == null;

  }

  @Override
  public int hashCode() {
    int result = sourceName != null ? sourceName.hashCode() : 0;
    result = 31 * result + (workspace != null ? workspace.hashCode() : 0);
    result = 31 * result + (dataSet != null ? dataSet.hashCode() : 0);
    return result;
  }

  @Override
  public String toString() {
    return "DataAssetLinkDataSetComp{" +
        "sourceName='" + sourceName + '\'' +
        ", workspace='" + workspace + '\'' +
        ", dataSet='" + dataSet + '\'' +
        '}';
  }
}
