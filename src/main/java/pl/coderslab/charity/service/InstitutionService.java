package pl.coderslab.charity.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.coderslab.charity.entity.Category;
import pl.coderslab.charity.entity.Institution;
import pl.coderslab.charity.repository.InstitutionRepository;

import java.util.List;

@Service("institutionService")
public class InstitutionService {

    private InstitutionRepository institutionRepository;

    @Autowired
    public InstitutionService(InstitutionRepository institutionRepository) {
        this.institutionRepository = institutionRepository;
    }

    public Institution findByName(String name) {
        return institutionRepository.findByName(name);
    }

    public List<Institution> findAll() {
        return institutionRepository.findAll();
    }

    public List<Institution> findAllHavingCategories(List<Category> categories){
        return institutionRepository.findInstitutionsByCategoriesIs(categories);
    }

}
