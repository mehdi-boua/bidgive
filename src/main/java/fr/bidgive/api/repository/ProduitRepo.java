package fr.bidgive.api.repository;

import fr.bidgive.api.model.Produit;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProduitRepo extends CrudRepository<Produit, Integer> {
    @Query("SELECT * FROM produits p INNER JOIN enchere e on e.idProduit = p.id where e.etat = 1")
    Iterable<Produit> activeProduits();

    @Query("SELECT * FROM produits p INNER JOIN enchere e on e.idProduit = p.id where e.etat = -1")
    Iterable<Produit> findWaiting();
}
