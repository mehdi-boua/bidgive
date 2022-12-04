package fr.bidgive.api.service;

import fr.bidgive.api.model.Categorie;
import fr.bidgive.api.model.CategorieDescription;
import fr.bidgive.api.model.CategorieDescriptionOption;
import fr.bidgive.api.model.Produit;
import fr.bidgive.api.repository.CategorieRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategorieService {
    @Autowired
    CategorieRepo categorieRepo;
    @Autowired
    CategorieDescriptionService cdservice;


    public Iterable<Categorie> getCategories(){
        return categorieRepo.findAll();
    }

    public Optional<Categorie> getCategorie(final int id){
        return categorieRepo.findById(id);
    }

    public Categorie saveCategorie(Categorie cat){
        return categorieRepo.save(cat);
    }

    public Iterable<Produit> findCategorieProducts(final int idCategorie){
        return categorieRepo.findCategorieProducts(idCategorie);
    }

    public Iterable<CategorieDescription> getDesc(final int idCategorie){
        return cdservice.getAll(idCategorie);
    }

    public Iterable<CategorieDescriptionOption> getDescOptions(final int idDesc){
        return cdservice.getOptions(idDesc);
    }
}
