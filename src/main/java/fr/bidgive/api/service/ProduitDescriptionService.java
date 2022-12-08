package fr.bidgive.api.service;

import fr.bidgive.api.model.ProduitDescription;
import fr.bidgive.api.repository.ProduitDescriptionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProduitDescriptionService {
    @Autowired
    ProduitDescriptionRepo produitDescriptionRepo;

    public Iterable<ProduitDescription> findProductDesc(final int idProduct){
        return produitDescriptionRepo.findProductDesc(idProduct);
    }

    public ProduitDescription save(ProduitDescription prodDesc){
        return produitDescriptionRepo.save(prodDesc);
    }
}
