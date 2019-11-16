package pl.coderslab.charity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.coderslab.charity.entity.Institution;
import pl.coderslab.charity.service.InstitutionService;

import java.util.List;

@RestController
@RequestMapping("/institution")
public class InstitutionRestController {

    @Autowired
    private InstitutionService institutionService;

    @GetMapping("/")
    public List<Institution> getInstitutions() {

        return institutionService.findAll();

    }
}
