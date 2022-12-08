package fr.bidgive.api.repository;

import fr.bidgive.api.model.ProduitDescription;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProduitDescriptionRepo extends CrudRepository<ProduitDescription, Integer> {
    @Query("SELECT  * FROM produitDescription WHERE idProd=:idProduct")
    Iterable<ProduitDescription> findProductDesc(final int idProduct);
}
