package com.lovtter.dg.controller;


import com.lovtter.dg.domain.DgCategory;
import com.lovtter.dg.service.DgCategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/lovtter/dg/category")
@CrossOrigin
public class DgCategoryController {

    private static Logger logger = LoggerFactory.getLogger(DgCategoryController.class);

    @Autowired
    private DgCategoryService dgCategoryService;

    @RequestMapping(method = RequestMethod.GET, path = "/", produces = "application/json")
    public Iterable<DgCategory> getAllCategory() {
        return dgCategoryService.findAll();
    }

    @RequestMapping(method = RequestMethod.POST, path = "/")
    public void createDgCategory(@RequestBody DgCategory dgCategory) {
        dgCategoryService.create(dgCategory);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}", produces = "application/json")
    public DgCategory getDgCategoryById(@PathVariable long id) {
        return dgCategoryService.getCategoryById(id);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    public void deleteDgCategory(@PathVariable Long id) {
        dgCategoryService.delete(id);
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/{id}")
    public void updateDgCategory(@PathVariable Long id, @RequestBody DgCategory dgCategory) {
        dgCategoryService.updateCategory(id, dgCategory);
    }
}
