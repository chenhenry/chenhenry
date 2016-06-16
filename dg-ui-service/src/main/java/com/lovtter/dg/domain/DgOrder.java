package com.lovtter.dg.domain;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by zhiweic on 5/17/2016.
 */
@Entity
@Table(name = "DG_ORDER")
public class DgOrder {
  private static final long serialVersionUID = 2L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id_dg_order")
  private long id;

  @Column(name = "clientId")
  private long clientId;

  @OneToMany(mappedBy = "dgOrder", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<DgOrderItem> dgOrderItems;

  @Column(name = "code")
  private String code;

  @Column(name = "clientName")
  private String clientName;

  @Column(name = "total_sum")
  private double totalSum;

  @Column(name = "phone")
  private String phone;

  @Column(name = "address")
  private String address;

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

  public long getClientId() {
    return clientId;
  }

  public void setClientId(long clientId) {
    this.clientId = clientId;
  }

  public List<DgOrderItem> getDgOrderItems() {
    return dgOrderItems;
  }

  public void setDgOrderItems(List<DgOrderItem> dgOrderItems) {
    this.dgOrderItems = dgOrderItems;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getClientName() {
    return clientName;
  }

  public void setClientName(String clientName) {
    this.clientName = clientName;
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

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }
}
