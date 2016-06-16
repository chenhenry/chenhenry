package com.lovtter.dg.controller;


import com.lovtter.dg.domain.DgOrder;
import com.lovtter.dg.domain.DgOrderItem;
import com.lovtter.dg.service.DgClientService;
import com.lovtter.dg.service.DgOrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping(path = "/lovtter/dg/order")
@CrossOrigin
public class DgOrderController {

    private static Logger logger = LoggerFactory.getLogger(DgOrderController.class);

    @Autowired
    private DgOrderService dgOrderService;

    @Autowired
    private DgClientService dgClientService;

    @RequestMapping(method = RequestMethod.GET, path = "/", produces = "application/json")
    public Iterable<DgOrder> getAllOrder() {
        return dgOrderService.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/client/{clientId}", produces = "application/json")
    public Iterable<DgOrder> getOrdersByClientId(@PathVariable long clientId) {
        return dgOrderService.getOrdersByClientId(clientId);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/")
    public void createDataAsset(@RequestBody DgOrder dgOrder) {
        dgOrder.setCreateTime(new Date());
        if (dgOrder.getDgOrderItems() != null) {
            for (DgOrderItem dgOrderItem : dgOrder.getDgOrderItems()) {
                dgOrderItem.setDgOrder(dgOrder);
            }
        }
        dgOrderService.create(dgOrder);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}", produces = "application/json")
    public DgOrder getDgOrderById(@PathVariable long id) {
        return dgOrderService.getOrderById(id);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    public void deleteDataAsset(@PathVariable long id) {
        dgOrderService.delete(id);
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/{id}")
    public void updateDgClient(@PathVariable long id, @RequestBody DgOrder dgOrder) {
        dgOrder.setCreateTime(new Date());
        if (dgOrder.getDgOrderItems() != null) {
            for (DgOrderItem dgOrderItem : dgOrder.getDgOrderItems()) {
                dgOrderItem.setDgOrder(dgOrder);
            }
        }
        dgOrderService.updateDgClient(id, dgOrder);
    }
}
