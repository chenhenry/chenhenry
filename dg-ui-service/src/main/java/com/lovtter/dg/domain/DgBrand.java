package com.lovtter.dg.domain;

import javax.persistence.*;

/**
 * Created by zhiweic on 5/17/2016.
 */
@Entity
@Table(name = "DG_BRAND")
public class DgBrand {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_dg_brand")
    private long id;

    @Column(name = "name")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
