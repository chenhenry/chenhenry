package com.lovtter.dg.service.impl;


import com.lovtter.dg.domain.DgClient;
import com.lovtter.dg.repository.DgClientRepository;
import com.lovtter.dg.service.DgClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class DgClientServiceImpl implements DgClientService {

    @Autowired
    private DgClientRepository dgClientRepository;


    @Override
    public Iterable<DgClient> findAll() {
        return dgClientRepository.findAll();
    }

    @Override
    public DgClient getClientById(Long id) {
        return dgClientRepository.findById(id);
    }
    @Override
    public void delete(Long id) {
        dgClientRepository.delete(id);
    }

    @Override
    public void updateDgClient(Long id, DgClient dgClient) {
        dgClientRepository.save(dgClient);
    }

    @Override
    public void create(DgClient dgClient) {
        dgClientRepository.save(dgClient);
    }
}
