package fr.bidgive.api.controller;

import fr.bidgive.api.model.Association;
import fr.bidgive.api.service.AssociationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/association")
public class AssociationController {
    @Autowired
    AssociationService associationService;

    @CrossOrigin(origins = "*")
    @GetMapping("/all")
    public Iterable<Association> getAssociations(){
        return associationService.getAssociations();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    public Association getAssociation(@PathVariable("id") final int id){
        Optional<Association> assoc = associationService.getAssociation(id);
        return assoc.orElse(null);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/{id}")
    public Association updateAssociation(@PathVariable("id") final int id, @RequestBody Association assoc){
        Optional<Association> a = associationService.getAssociation(id);
        if(a.isPresent()){
            Association currentAssoc = a.get();

            String nom = assoc.getNom();
            String description = assoc.getDescription();
            String lien = assoc.getLien();

            if(nom != null){
                currentAssoc.setNom(nom);
            }
            if(description != null){
                currentAssoc.setDescription(description);
            }
            if(lien != null){
                currentAssoc.setLien(lien);
            }
            return currentAssoc;
        }
        return null;
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/new")
    public Association createAssociation(@RequestBody Association assoc){
        return associationService.saveAssociation(assoc);
    }
}
