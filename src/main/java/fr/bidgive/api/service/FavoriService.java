package fr.bidgive.api.service;

import fr.bidgive.api.model.Favori;
import fr.bidgive.api.repository.FavoriRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FavoriService {
    @Autowired
    FavoriRepo favoriRepo;

    public Favori newFavori(final int idProduit, final int idUser){
        Favori favori = new Favori();
        favori.setIdProduit(idProduit);
        favori.setIdUser(idUser);

        return favoriRepo.save(favori);
    }

    public Iterable<Favori> getAll(final int idUser){
        return favoriRepo.getUserFavoris(idUser);
    }

    public void deleteFavori(Favori favori){
        favoriRepo.deleteFavori(favori.getIdUser(), favori.getIdProduit());
    }
}
