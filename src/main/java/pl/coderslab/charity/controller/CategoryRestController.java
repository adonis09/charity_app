package pl.coderslab.charity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.coderslab.charity.entity.Category;
import pl.coderslab.charity.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryRestController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/")
    public List<Category> getCategories(){
        return categoryService.findAll();
    }

}
