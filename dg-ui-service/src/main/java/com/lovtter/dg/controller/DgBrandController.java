package com.lovtter.dg.controller;


import com.lovtter.dg.domain.DgBrand;
import com.lovtter.dg.service.DgBrandService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/lovtter/dg/brand")
@CrossOrigin
public class DgBrandController {

  private static Logger logger = LoggerFactory.getLogger(DgBrandController.class);

  @Autowired
  private DgBrandService dgBrandService;

  @RequestMapping(method = RequestMethod.GET, path = "/", produces = "application/json")
  public Iterable<DgBrand> getAllBrand() {
    return dgBrandService.findAll();
  }

  @RequestMapping(method = RequestMethod.POST, path = "/")
  public void createDgBrand(@RequestBody DgBrand dgBrand) {
    dgBrandService.create(dgBrand);
  }

  @RequestMapping(method = RequestMethod.GET, path = "/{id}", produces = "application/json")
  public DgBrand getDgBrandById(@PathVariable long id) {
    return dgBrandService.getBrandById(id);
  }

  @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
  public void deleteDgBrand(@PathVariable Long id) {
    dgBrandService.delete(id);
  }

  @RequestMapping(method = RequestMethod.PUT, path = "/{id}")
  public void updateDgBrand(@PathVariable Long id, @RequestBody DgBrand dgBrand) {
    dgBrandService.updateDgBrand(id, dgBrand);
  }
}
