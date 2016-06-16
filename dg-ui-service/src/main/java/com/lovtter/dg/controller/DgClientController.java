package com.lovtter.dg.controller;


import com.lovtter.dg.domain.DgClient;
import com.lovtter.dg.service.DgClientService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/lovtter/dg/client")
@CrossOrigin
public class DgClientController {

  private static Logger logger = LoggerFactory.getLogger(DgClientController.class);

  @Autowired
  private DgClientService dgClientService;

  @RequestMapping(method = RequestMethod.GET, path = "/", produces = "application/json")
  public Iterable<DgClient> getAllClient() {
    return dgClientService.findAll();
  }

  @RequestMapping(method = RequestMethod.POST, path = "/")
  public void createDgClient(@RequestBody DgClient dgClient) {
    dgClientService.create(dgClient);
  }

  @RequestMapping(method = RequestMethod.GET, path = "/{id}", produces = "application/json")
  public DgClient getDgClientById(@PathVariable long id) {
    return dgClientService.getClientById(id);
  }

  @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
  public void deleteDgClient(@PathVariable Long id) {
    dgClientService.delete(id);
  }

  @RequestMapping(method = RequestMethod.PUT, path = "/{id}")
  public void updateDgClient(@PathVariable Long id, @RequestBody DgClient dgClient) {
    dgClientService.updateDgClient(id, dgClient);
  }
}
