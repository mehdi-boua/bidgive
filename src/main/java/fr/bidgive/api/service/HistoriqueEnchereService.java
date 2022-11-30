package fr.bidgive.api.service;

import fr.bidgive.api.model.Enchere;
import fr.bidgive.api.model.HistoriqueEnchere;
import fr.bidgive.api.repository.HistoriqueEnchereRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HistoriqueEnchereService {
    @Autowired
    HistoriqueEnchereRepo historiqueEnchereRepo;

    public Iterable<HistoriqueEnchere> getHistorique(final int idProduit){
        return historiqueEnchereRepo.findAllByIdProduit(idProduit);
    }

    public HistoriqueEnchere saveHistorique(Enchere enchere){
        HistoriqueEnchere he = new HistoriqueEnchere();
        he.setIdProduit(enchere.getIdProduit());
        he.setIdEnchereur(enchere.getIdEnchereur());
        he.setValeur(enchere.getValeur());

        return historiqueEnchereRepo.save(he);
    }
}
