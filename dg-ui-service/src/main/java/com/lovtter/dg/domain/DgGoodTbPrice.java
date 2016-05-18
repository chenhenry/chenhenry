package com.lovtter.dg.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Created by zhiweic on 5/17/2016.
 */
@Entity
@Table(name = "DG_GOOD_TB_PRICE")
public class DgGoodTbPrice {
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id_dg_good_tb_price")
  @JsonIgnore
  private long id;

  @Column(name = "price")
  private double price;

  @Column(name = "shop_name")
  private String shop_name;

  @Column(name = "url")
  private String url;

  @Column(name = "type")
  @Enumerated(EnumType.STRING)
  private DGGoodPriceType String;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_dg_good", updatable = false, insertable = true, nullable = false)
  @JsonIgnore
  private DgGood dgGood;

  public static long getSerialVersionUID() {
    return serialVersionUID;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public java.lang.String getShop_name() {
    return shop_name;
  }

  public void setShop_name(java.lang.String shop_name) {
    this.shop_name = shop_name;
  }

  public java.lang.String getUrl() {
    return url;
  }

  public void setUrl(java.lang.String url) {
    this.url = url;
  }

  public DGGoodPriceType getString() {
    return String;
  }

  public void setString(DGGoodPriceType string) {
    String = string;
  }

  public DgGood getDgGood() {
    return dgGood;
  }

  public void setDgGood(DgGood dgGood) {
    this.dgGood = dgGood;
  }
}
