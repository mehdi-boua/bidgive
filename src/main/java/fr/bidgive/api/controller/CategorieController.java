package fr.bidgive.api.controller;

import fr.bidgive.api.controller.returnBeans.CategorieDescReturn;
import fr.bidgive.api.model.Categorie;
import fr.bidgive.api.model.CategorieDescription;
import fr.bidgive.api.model.CategorieDescriptionOption;
import fr.bidgive.api.service.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

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
    public Iterable<CategorieDescReturn> getDesc(@PathVariable final int id){
        List<CategorieDescReturn> list = new ArrayList<>();
        categorieService.getDesc(id).forEach(desc -> list.add(new CategorieDescReturn(desc)));
        return list;
    }

    @GetMapping("/{idcat}/{iddesc}/opt")
    public Iterable<String> getDescOptions(@PathVariable final int idcat, @PathVariable final int iddesc){
        List<String> list = new ArrayList<>();
        categorieService.getDescOptions(iddesc).forEach(opt -> list.add(opt.getOption()));
        return list;
    }
}
