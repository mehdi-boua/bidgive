package fr.bidgive.api.service;

import fr.bidgive.api.model.Enchere;
import fr.bidgive.api.model.HistoriqueEnchere;
import fr.bidgive.api.repository.HistoriqueEnchereRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HistoriqueEnchereService {
    @Autowired
    HistoriqueEnchereRepo historiqueEnchereRepo;

    public Iterable<HistoriqueEnchere> getHistorique(final int idProduit){
        return historiqueEnchereRepo.findAllByIdProduit(idProduit);
    }

    public Iterable<Enchere> getUserParticipations(final int idUser){
        List<Enchere> ench = new ArrayList<>();
        for(HistoriqueEnchere he:historiqueEnchereRepo.findAllByIdUser(idUser) ){
            Enchere temp = new Enchere();
            temp.setIdEnchereur(he.getIdEnchereur());
            temp.setValeur(he.getValeur());
            temp.setIdProduit(he.getIdProduit());

            ench.add(temp);
        }

        return ench;
    }

    public HistoriqueEnchere saveHistorique(Enchere enchere){
        HistoriqueEnchere he = new HistoriqueEnchere();
        he.setIdProduit(enchere.getIdProduit());
        he.setIdEnchereur(enchere.getIdEnchereur());
        he.setValeur(enchere.getValeur());

        return historiqueEnchereRepo.save(he);
    }

    public int nbParticipants(final int idProd){
        return historiqueEnchereRepo.nbParticipants(idProd);
    }

    public int nbEncheres(final int idProd){
        return historiqueEnchereRepo.nbEncheres(idProd);
    }
}
