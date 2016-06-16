package com.lovtter.dg.service.impl;


import com.lovtter.dg.domain.DgBrand;
import com.lovtter.dg.repository.DgBrandRepository;
import com.lovtter.dg.service.DgBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class DgBrandServiceImpl implements DgBrandService {

    @Autowired
    private DgBrandRepository dgBrandRepository;


    @Override
    public Iterable<DgBrand> findAll() {
        return dgBrandRepository.findAll();
    }

    @Override
    public DgBrand getBrandById(Long id) {
        return dgBrandRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        dgBrandRepository.delete(id);
    }

    @Override
    public void updateDgBrand(Long id, DgBrand dgBrand) {
        dgBrandRepository.save(dgBrand);
    }

    @Override
    public void create(DgBrand dgBrand) {
        dgBrandRepository.save(dgBrand);
    }
}
