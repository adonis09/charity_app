package pl.coderslab.charity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.coderslab.charity.entity.Institution;
import pl.coderslab.charity.service.InstitutionService;

import java.util.List;

@RestController
@RequestMapping("/ins")
public class InstitutionRestController {

    @Autowired
    private InstitutionService institutionService;

    @GetMapping("/institutions")
    public List<Institution> getInstitutions() {

        List<Institution> institutionsList = institutionService.findAll();
        return institutionsList;

    }
}
