package com.lovtter.dg.controller;


import com.lovtter.dg.domain.DgGood;
import com.lovtter.dg.service.DgGoodService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/lovtter/dg/good")
@CrossOrigin
public class DgGoodController {

    private static Logger logger = LoggerFactory.getLogger(DgGoodController.class);

    @Autowired
    private DgGoodService dgGoodService;

    @RequestMapping(method = RequestMethod.GET, path = "/", produces = "application/json")
    public Iterable<DgGood> getAllDgGood() {
        return dgGoodService.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/brand/{brand}", produces = "application/json")
    public Iterable<DgGood> getAllDgGoodByBrand(@PathVariable String brand) {
        return dgGoodService.findByBrand(brand);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/category/{category}", produces = "application/json")
    public Iterable<DgGood> getAllDgGoodByCategory(@PathVariable String category) {
        return dgGoodService.findByCategory(category);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/")
    public void createDgGood(@RequestBody DgGood dgGood) {
        dgGoodService.create(dgGood);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}", produces = "application/json")
    public DgGood getDgGoodById(@PathVariable long id) {
        return dgGoodService.getDgGoodById(id);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    public void deleteDgGood(@PathVariable Long id) {
        dgGoodService.delete(id);
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/{id}")
    public void updateDgGood(@PathVariable Long id, @RequestBody DgGood dgGood) {
        dgGoodService.updateDgGood(id, dgGood);
    }
}
