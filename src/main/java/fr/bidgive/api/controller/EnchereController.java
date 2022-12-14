package fr.bidgive.api.controller;

import fr.bidgive.api.model.Enchere;
import fr.bidgive.api.service.EnchereService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/ench")
public class EnchereController {
    @Autowired
    EnchereService enchereService;

    @GetMapping("/all")
    @CrossOrigin(origins = "*")
    public Iterable<Enchere> getAll(){
        return enchereService.getAll();
    }

    @PostMapping("/new")
    @CrossOrigin(origins = "*")
    public Enchere createEnchere(@RequestBody Enchere enchere){
        Optional<Enchere> e = enchereService.getEnchere(enchere.getIdProduit());
        if(e.isPresent()){
            Enchere current = e.get();

            if(current.getValeur() >= enchere.getValeur())
                return  null;

            int valeur = enchere.getValeur();
            int enchereur = enchere.getIdEnchereur();

            if(enchereur != 0)
                current.setIdEnchereur(enchereur);
            if(valeur != 0)
                current.setValeur(valeur);

            enchereService.saveEnchere(current);

            return current;
        }

        return enchereService.saveEnchere(enchere);
    }

    @DeleteMapping("/delete")
    @CrossOrigin(origins = "*")
    public void deleteEnchere(@RequestBody Enchere enchere){
        enchereService.deleteEnchere(enchere);
    }

}
