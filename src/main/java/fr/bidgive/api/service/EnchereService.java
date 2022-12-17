package fr.bidgive.api.service;

import fr.bidgive.api.model.Enchere;
import fr.bidgive.api.model.Produit;
import fr.bidgive.api.repository.EnchereRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Optional;

@Service
public class EnchereService {
    @Autowired
    EnchereRepo enchereRepo;
    @Autowired
    HistoriqueEnchereService hes;

    public Iterable<Enchere> getAll(){
        //return enchereRepo.getActiveEncheres();
        return enchereRepo.findAll();
    }

    public Iterable<Enchere> getWaiting(){
        return enchereRepo.findWaiting();
    }

    public Optional<Enchere> getEnchere(final int idProduit){
        return enchereRepo.findByIdProduit(idProduit);
    }

    public Enchere saveEnchere(Enchere enchere){
        if(enchere.getIdEnchereur() != 0)
            hes.saveHistorique(enchere);

        return enchereRepo.save(enchere);
    }

    public void deleteEnchere(Enchere enchere){
        enchereRepo.delete(enchere);
    }

    public void deleteEnchere(final int id){
        enchereRepo.deleteById(id);
    }
}
