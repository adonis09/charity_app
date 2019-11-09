package pl.coderslab.charity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.coderslab.charity.entity.Institution;
import pl.coderslab.charity.repository.InstitutionRepository;
import pl.coderslab.charity.service.InstitutionService;

import java.util.List;


@Controller
public class HomeController {

    @Autowired
    private InstitutionService institutionService;

    @RequestMapping("/")
    public String homeAction(Model model){

        List<Institution> institutionsList = institutionService.findAll();
        model.addAttribute("allInstitutions", institutionsList);
        return "index";
    }

}
