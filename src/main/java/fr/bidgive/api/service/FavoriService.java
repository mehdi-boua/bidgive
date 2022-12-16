package fr.bidgive.api.service;

import fr.bidgive.api.model.Favori;
import fr.bidgive.api.model.Produit;
import fr.bidgive.api.repository.FavoriRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FavoriService {
    @Autowired
    FavoriRepo favoriRepo;

    @Autowired
    ProduitService ps;

    public Favori newFavori(final int idProduit, final int idUser){
        Favori favori = new Favori();
        favori.setIdProduit(idProduit);
        favori.setIdUser(idUser);

        return favoriRepo.save(favori);
    }

    public Iterable<Produit> getAll(final int idUser){
        List<Produit> prodList = new ArrayList<>();
        for(Favori fav: favoriRepo.getUserFavoris(idUser)){
            prodList.add(ps.getProduit(fav.getIdProduit()).get());
        }
        return prodList;
    }

    public void deleteFavori(Favori favori){
        favoriRepo.deleteFavori(favori.getIdUser(), favori.getIdProduit());
    }
}
