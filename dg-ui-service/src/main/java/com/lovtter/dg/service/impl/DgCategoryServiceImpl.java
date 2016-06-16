package com.lovtter.dg.service.impl;


import com.lovtter.dg.domain.DgCategory;
import com.lovtter.dg.repository.DgCategoryRepository;
import com.lovtter.dg.service.DgCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class DgCategoryServiceImpl implements DgCategoryService {

    @Autowired
    private DgCategoryRepository dgCategoryRepository;


    @Override
    public Iterable<DgCategory> findAll() {
        return dgCategoryRepository.findAll();
    }

    @Override
    public DgCategory getCategoryById(Long id) {
        return dgCategoryRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        dgCategoryRepository.delete(id);
    }

    @Override
    public void updateCategory(Long id, DgCategory dgCategory) {
        dgCategoryRepository.save(dgCategory);
    }

    @Override
    public void create(DgCategory dgCategory) {
        dgCategoryRepository.save(dgCategory);
    }
}
