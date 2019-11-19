package pl.coderslab.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.coderslab.charity.entity.Category;
import pl.coderslab.charity.entity.Institution;

import java.util.List;

@Repository
public interface InstitutionRepository extends JpaRepository<Institution, Long> {

    Institution findByName(String name);

    List<Institution> findAll();

    /*    @Query("SELECT institution1 FROM Institution institution1" +
            "    JOIN institution1.categories category1" +
            "WHERE SIZE(categories) = (" +
            "        SELECT COUNT(category2) FROM Institution institution2" +
            "            JOIN institution2.categories category2" +
            "        WHERE institution2.id = institution1.id)" +
            "    AND SIZE(:categories) = (" +
            "        SELECT COUNT(category2) FROM Institution institution2" +
            "            JOIN institution.categories category2" +
            "        WHERE institution2.id = institution1.id AND category2.id IN categories)")
    List<Institution> findInstitutionsHavingCategories(List<Category> categories);*/

    List<Institution> findInstitutionsByCategoriesIs(List<Category> categories);


}