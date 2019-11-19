package pl.coderslab.charity.controller;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jdk.nashorn.internal.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.coderslab.charity.entity.Category;
import pl.coderslab.charity.entity.Institution;
import pl.coderslab.charity.service.CategoryService;
import pl.coderslab.charity.service.InstitutionService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/institution")
public class InstitutionRestController {

    @Autowired
    private InstitutionService institutionService;

    @Autowired
    private CategoryService categoryService;


    @GetMapping("/")
    public List<Institution> getInstitutions() {

        return institutionService.findAll();

    }

    List<Category> testCategories = new ArrayList<>();

    @GetMapping("/test")
    public String showSelectedInstitutions(){

        testCategories.add(categoryService.getById(1L));
        testCategories.add(categoryService.getById(3L));
        testCategories.add(categoryService.getById(4L));

        List<Institution> selectedInstitutions = institutionService.findAllHavingCategories(testCategories);

        return selectedInstitutions.toString();

    }


}
