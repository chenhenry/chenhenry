package com.lovtter.dg.domain;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by zhiweic on 5/17/2016.
 */
@Entity
@Table(name = "DG_CLIENT")
public class DgClient {
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id_dg_client")
  private long id;

  @Column(name = "name")
  private String name;

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

//  @OneToMany(mappedBy = "dgClient", cascade = CascadeType.ALL, orphanRemoval = true)
//  @JsonIgnore
//  private List<DgOrder> dgOrders;

  public static long getSerialVersionUID() {
    return serialVersionUID;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
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

  public Date getUpdateTime() {
    return updateTime;
  }

  public void setUpdateTime(Date updateTime) {
    this.updateTime = updateTime;
  }

}
