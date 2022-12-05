package fr.bidgive.api.controller;

import fr.bidgive.api.model.Produit;
import fr.bidgive.api.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/prod")
public class ProduitController {
    @Autowired
    ProduitService produitService;

    @CrossOrigin(origins = "*")
    @GetMapping("/all")
    public Iterable<Produit> tous(){
        List<Produit> list = new ArrayList<>();
        produitService.getAllActive().forEach(list::add);
        produitService.getAllWaiting().forEach(list::add);

        return list;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    public Optional<Produit> un(@PathVariable final int id){
        return produitService.getProduit(id);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/new")
    public Produit createProduit(@RequestBody Produit produit){
        if(produit.getDesignation() == null)
            produit.setDesignation("");
        if(produit.getDescription() == null)
            produit.setDescription("");
        if(produit.getLienImages() == null)
            produit.setLienImages("");
        if(produit.getNomVille() == null)
            produit.setNomVille("");
        if(produit.getDebutEnchere() == null)
            produit.setDebutEnchere(new Timestamp(System.currentTimeMillis()));


        return produitService.saveProduit(produit);
    }
}
