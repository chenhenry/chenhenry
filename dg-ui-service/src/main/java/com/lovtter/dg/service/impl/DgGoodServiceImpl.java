package com.lovtter.dg.service.impl;


import com.lovtter.dg.domain.DgGood;
import com.lovtter.dg.repository.DgGoodRepository;
import com.lovtter.dg.service.DgGoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class DgGoodServiceImpl implements DgGoodService {

    @Autowired
    private DgGoodRepository dgGoodRepository;


    @Override
    public Iterable<DgGood> findAll() {
        return dgGoodRepository.findAll();
    }

    @Override
    public DgGood getDgGoodById(Long id) {
        return dgGoodRepository.findById(id);
    }
    @Override
    public void delete(Long id) {
        dgGoodRepository.delete(id);
    }

    @Override
    public void updateDgGood(Long id, DgGood dgGood) {
        dgGoodRepository.save(dgGood);
    }

    @Override
    public void create(DgGood dgGood) {
        dgGoodRepository.save(dgGood);
    }
}
