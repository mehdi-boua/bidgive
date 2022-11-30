package fr.bidgive.api.service;

import fr.bidgive.api.model.Livraison;
import fr.bidgive.api.repository.LivraisonRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LivraisonService {
    @Autowired
    LivraisonRepo livraisonRepo;

    public Iterable<Livraison> getAll(){
        return livraisonRepo.findAll();
    }
}
