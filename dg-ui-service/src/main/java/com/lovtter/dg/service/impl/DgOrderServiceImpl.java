package com.lovtter.dg.service.impl;


import com.lovtter.dg.domain.DgClient;
import com.lovtter.dg.domain.DgOrder;
import com.lovtter.dg.repository.DgOrderRepository;
import com.lovtter.dg.service.DgClientService;
import com.lovtter.dg.service.DgOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
public class DgOrderServiceImpl implements DgOrderService {

    @Autowired
    private DgOrderRepository dgOrderRepository;

    @Autowired
    private DgClientService dgClientService;

    @Override
    public Iterable<DgOrder> findAll() {
        return dgOrderRepository.findAll();
    }

    @Override
    public DgOrder getOrderById(Long id) {
        return dgOrderRepository.findById(id);
    }
    @Override
    public void delete(Long id) {
        dgOrderRepository.delete(id);
    }

    @Override
    public void updateDgClient(Long id, DgOrder dgOrder) {
        dgOrderRepository.save(dgOrder);
    }

    @Override
    public void create(DgOrder dgOrder) {
        dgOrderRepository.save(dgOrder);
    }

    @Override
    //TODO:TO DELETE
    public Iterable<DgOrder> getOrdersByClientId(Long id){
        List<DgOrder> dgOrders = Collections.emptyList();
        DgClient dgClient = dgClientService.getClientById(id);
        return dgOrders;
    }
}
