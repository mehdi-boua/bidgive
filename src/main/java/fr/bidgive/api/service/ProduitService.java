package fr.bidgive.api.service;

import fr.bidgive.api.model.Enchere;
import fr.bidgive.api.model.Produit;
import fr.bidgive.api.repository.ProduitRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.sql.Timestamp;
import java.util.Optional;

@Service
public class ProduitService {
    @Autowired
    ProduitRepo produitRepo;

    @Autowired
    EnchereService enchereService;

    public Iterable<Produit> getAll(){
        return produitRepo.findAll();
    }

    public Iterable<Produit> getAllActive(){
        return produitRepo.activeProduits();
    }

    public Optional<Produit> getProduit(final int id){
        return produitRepo.findById(id);
    }

    public Produit saveProduit(Produit produit){
        Enchere enchere = new Enchere();
        enchere.setIdProduit(produit.getId());
        enchere.setValeur(produit.getPrixDepart() - 1);
        enchere.setIdEnchereur(0);
        enchere.setEtat(-1);

        return produitRepo.save(produit);
    }

    @Scheduled(cron = "0 0 * * * *")
    private void updateEtat(){
        Iterable<Produit> produits = getAllActive();
        for(Produit p: produits){
            long ellapsedTime = (System.currentTimeMillis() - p.getDebutEnchere().getTime()) /  (3600 * 1000);
            System.out.println(ellapsedTime);

            if(ellapsedTime >= p.getDureeEnchere()){
                Optional<Enchere> e = enchereService.getEnchere(p.getId());
                if(e.isPresent()){
                    Enchere enchere = e.get();
                    enchere.setEtat(0);
                    enchereService.saveEnchere(enchere);
                }
            }
        }

        Iterable<Enchere> encheres = enchereService.getWaiting();
        for(Enchere e: encheres){
            e.setEtat(1);
            Produit p = this.getProduit(e.getIdProduit()).get();
            // on revient 1,5 s en arrière par sécurité afin de s'assurer que l'enchère se termine bien a la bonne heure
            p.setDebutEnchere(new Timestamp(System.currentTimeMillis() - 1500));
            enchereService.saveEnchere(e);
            this.saveProduit(p);

        }
    }
}
