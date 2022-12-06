package fr.bidgive.api.controller;

import fr.bidgive.api.controller.returnBeans.CategorieDescReturn;
import fr.bidgive.api.model.Categorie;
import fr.bidgive.api.model.CategorieDescription;
import fr.bidgive.api.model.CategorieDescriptionOption;
import fr.bidgive.api.model.Produit;
import fr.bidgive.api.service.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/cat")
public class CategorieController {
    @Autowired
    CategorieService categorieService;

    @CrossOrigin(origins = "*")
    @GetMapping("/all")
    public Iterable<Categorie> getAll(){
        return categorieService.getCategories();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{id}/produits")
    public Iterable<Produit> categorieProducts(@PathVariable final int id){
        return categorieService.findCategorieProducts(id);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{id}/desc")
    public Iterable<CategorieDescReturn> getDesc(@PathVariable final int id){
        List<CategorieDescReturn> list = new ArrayList<>();
        categorieService.getDesc(id).forEach(desc -> list.add(new CategorieDescReturn(desc)));
        return list;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{idcat}/{iddesc}/opt")
    public Iterable<String> getDescOptions(@PathVariable final int idcat, @PathVariable final int iddesc){
        List<String> list = new ArrayList<>();
        categorieService.getDescOptions(iddesc).forEach(opt -> list.add(opt.getOption()));
        return list;
    }
}
