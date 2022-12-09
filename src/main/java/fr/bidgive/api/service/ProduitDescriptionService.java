package fr.bidgive.api.service;

import fr.bidgive.api.controller.returnBeans.ProdDescReturn;
import fr.bidgive.api.model.CategorieDescription;
import fr.bidgive.api.model.Produit;
import fr.bidgive.api.model.ProduitDescription;
import fr.bidgive.api.repository.ProduitDescriptionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProduitDescriptionService {
    @Autowired
    ProduitDescriptionRepo produitDescriptionRepo;
    @Autowired
    CategorieDescriptionService cdservice;
    @Autowired
    ProduitService produitService;

    public Iterable<ProduitDescription> findProductDesc(final int idProduct){
        return produitDescriptionRepo.findProductDesc(idProduct);
    }

    public List<ProdDescReturn> prodDesc(final int id){
        List<ProdDescReturn> ret = new ArrayList<>();

        Produit produit = produitService.getProduit(id).get();
        Iterable<ProduitDescription> descs = produitDescriptionRepo.findProductDesc(produit.getId());

        for (ProduitDescription p: descs){
            ProdDescReturn elem = new ProdDescReturn();
            elem.setDesc(cdservice.find(p.getId()).get().getTitre());
            elem.setOption(p.getOption());
            ret.add(elem);
        }

        return ret;
    }

    public ProduitDescription save(ProduitDescription prodDesc){
        return produitDescriptionRepo.save(prodDesc);
    }
}
