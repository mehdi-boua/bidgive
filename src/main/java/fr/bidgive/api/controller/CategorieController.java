package fr.bidgive.api.controller;

import fr.bidgive.api.model.Categorie;
import fr.bidgive.api.model.CategorieDescription;
import fr.bidgive.api.model.CategorieDescriptionOption;
import fr.bidgive.api.service.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cat")
public class CategorieController {
    @Autowired
    CategorieService categorieService;

    @GetMapping("/all")
    public Iterable<Categorie> getAll(){
        return categorieService.getCategories();
    }

    @GetMapping("/{id}/desc")
    public Iterable<CategorieDescription> getDesc(@PathVariable final int id){
        return categorieService.getDesc(id);
    }

    @GetMapping("/{idcat}/{iddesc}/opt")
    public Iterable<CategorieDescriptionOption> getDescOptions(@PathVariable final int idcat, final int iddesc){
        return categorieService.getDescOptions(iddesc);
    }
}
