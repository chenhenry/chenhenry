package com.lovtter.dg.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name = "DG_ORDER_ITEM")
public class DgOrderItem {
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id_dg_order_item")
  @JsonIgnore
  private long id;

  @Column(name = "name")
  private String name;

  @Column(name = "price")
  private double price;

  @Column(name = "number")
  private int number;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_dg_order", updatable = false, insertable = true, nullable = false)
  @JsonIgnore
  private DgOrder dgOrder;

  @Column(name = "goodId")
  private long goodId;

  @Column(name = "sum")
  private double sum;

  @Column(name = "brand")
  private String brand;

  @Column(name = "category")
  private String category;

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

  public int getNumber() {
    return number;
  }

  public void setNumber(int number) {
    this.number = number;
  }

  public DgOrder getDgOrder() {
    return dgOrder;
  }

  public void setDgOrder(DgOrder dgOrder) {
    this.dgOrder = dgOrder;
  }

  public long getGoodId() {
    return goodId;
  }

  public void setGoodId(long goodId) {
    this.goodId = goodId;
  }

  public double getSum() {
    return sum;
  }

  public void setSum(double sum) {
    this.sum = sum;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public String getBrand() {
    return brand;
  }

  public void setBrand(String brand) {
    this.brand = brand;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }
}
