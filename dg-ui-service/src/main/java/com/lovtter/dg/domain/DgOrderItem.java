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

  @Column(name = "number")
  private String number;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_dg_order", updatable = false, insertable = true, nullable = false)
  @JsonIgnore
  private DgOrder dgOrder;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_dg_good", updatable = false, insertable = true, nullable = false)
  @JsonIgnore
  private DgGood dgGood;

  @Column(name = "sum")
  private double sum;

  public static long getSerialVersionUID() {
    return serialVersionUID;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getNumber() {
    return number;
  }

  public void setNumber(String number) {
    this.number = number;
  }

  public DgOrder getDgOrder() {
    return dgOrder;
  }

  public void setDgOrder(DgOrder dgOrder) {
    this.dgOrder = dgOrder;
  }

  public DgGood getDgGood() {
    return dgGood;
  }

  public void setDgGood(DgGood dgGood) {
    this.dgGood = dgGood;
  }

  public double getSum() {
    return sum;
  }

  public void setSum(double sum) {
    this.sum = sum;
  }
}
