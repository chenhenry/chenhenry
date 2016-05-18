package com.lovtter.dg.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Date;
import java.util.List;

/**
 * Created by zhiweic on 5/17/2016.
 */
@Entity
@Table(name = "DG_ORDER")
public class DgOrder {
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id_dg_order")
  @JsonIgnore
  private long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_dg_client", updatable = false, insertable = true, nullable = false)
  private DgClient dgClient;

  @OneToMany(mappedBy = "dgOrder", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<DgOrderItem> dgOrderItems;

  @Column(name = "name")
  private String name;

  @Column(name = "total_sum")
  private double totalSum;

  @Column(name = "creator")
  private String creator;

  @Column(name = "create_time")
  private Date createTime;

  @Column(name = "description")
  private String description;

  @Column(name = "update_by")
  private String updateBy;

  @Column(name = "update_time")
  private Date updateTime;

  public Date getUpdateTime() {
    return updateTime;
  }

  public void setUpdateTime(Date updateTime) {
    this.updateTime = updateTime;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public DgClient getDgClient() {
    return dgClient;
  }

  public void setDgClient(DgClient dgClient) {
    this.dgClient = dgClient;
  }

  public List<DgOrderItem> getDgOrderItems() {
    return dgOrderItems;
  }

  public void setDgOrderItems(List<DgOrderItem> dgOrderItems) {
    this.dgOrderItems = dgOrderItems;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public double getTotalSum() {
    return totalSum;
  }

  public void setTotalSum(double totalSum) {
    this.totalSum = totalSum;
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

  public String getUpdateBy() {
    return updateBy;
  }

  public void setUpdateBy(String updateBy) {
    this.updateBy = updateBy;
  }
}
