package com.lovtter.dg.controller;


import com.lovtter.dg.domain.DgClient;
import com.lovtter.dg.domain.DgGood;
import com.lovtter.dg.domain.DgOrder;
import com.lovtter.dg.domain.DgOrderItem;
import com.lovtter.dg.service.DgOrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/lovtter/dg/order")
@CrossOrigin
public class DgOrderController {

  private static Logger logger = LoggerFactory.getLogger(DgOrderController.class);

  @Autowired
  private DgOrderService dgOrderService;

  @RequestMapping(method = RequestMethod.GET, path = "/", produces = "application/json")
  public Iterable<DgOrder> getAllOrder() {
    return dgOrderService.findAll();
  }

  @RequestMapping(method = RequestMethod.POST, path = "/")
  public void createDataAsset(@RequestBody DgOrder dgOrder) {
    if (dgOrder.getDgOrderItems() != null) {
      for (DgOrderItem item: dgOrder.getDgOrderItems()) {
        item.setDgOrder(dgOrder);
        DgGood dgGood = new DgGood();
        dgGood.setId(1);
        item.setDgGood(dgGood);
      }
    }
    DgClient dgClient = new DgClient();
    dgClient.setId(1);
    dgOrder.setDgClient(dgClient);
    dgOrderService.create(dgOrder);
  }

  @RequestMapping(method = RequestMethod.GET, path = "/{id}", produces = "application/json")
  public DgOrder getDgOrderById(@PathVariable long id) {
    return dgOrderService.getOrderById(id);
  }

  @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
  public void deleteDataAsset(@PathVariable Long id) {
    dgOrderService.delete(id);
  }

  @RequestMapping(method = RequestMethod.PUT, path = "/{id}")
  public void updateDgClient(@PathVariable Long id, @RequestBody DgOrder dgOrder) {
    dgOrderService.updateDgClient(id, dgOrder);
  }
}
