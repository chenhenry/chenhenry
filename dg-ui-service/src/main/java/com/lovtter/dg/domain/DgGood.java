package com.lovtter.dg.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Date;
import java.util.List;

/**
 * Created by zhiweic on 5/17/2016.
 */
@Entity
@Table(name = "DG_GOOD")
public class DgGood {
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id_dg_good")
  private long id;

  @Column(name = "name")
  private String name;

  @Column(name = "sale_price")
  private double salePrice;


  @OneToMany(mappedBy = "dgGood", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<DgGoodHkPrice> dgGoodHkPrices;

  @OneToMany(mappedBy = "dgGood", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<DgGoodTbPrice> dgGoodTbPrices;

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

  public List<DgGoodHkPrice> getDgGoodHkPrices() {
    return dgGoodHkPrices;
  }

  public void setDgGoodHkPrices(List<DgGoodHkPrice> dgGoodHkPrices) {
    dgGoodHkPrices.stream().forEach(price -> price.setDgGood(this));
    this.dgGoodHkPrices = dgGoodHkPrices;
  }

  public List<DgGoodTbPrice> getDgGoodTbPrices() {
    return dgGoodTbPrices;
  }

  public void setDgGoodTbPrices(List<DgGoodTbPrice> dgGoodTbPrices) {
    dgGoodTbPrices.stream().forEach(price -> price.setDgGood(this));
    this.dgGoodTbPrices = dgGoodTbPrices;
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
