package fr.bidgive.api.repository;

import fr.bidgive.api.model.Categorie;
import fr.bidgive.api.model.Produit;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategorieRepo extends CrudRepository<Categorie, Integer> {
    @Query("SELECT * FROM produits p inner join enchere e on p.id=e.idProduit " +
            "WHERE p.idCategorie = :idCategorie AND (e.etat = 1 OR e.etat =-1); ")
    Iterable<Produit> findCategorieProducts(final int idCategorie);
}
