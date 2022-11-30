package fr.bidgive.api.repository;

import fr.bidgive.api.model.Enchere;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EnchereRepo extends CrudRepository<Enchere, Integer> {
    @Query("SELECT * FROM enchere WHERE etat=1;")
    public Iterable<Enchere> getActiveEncheres();

    @Query("SELECT * FROM enchere WHERE etat=-1;")
    Iterable<Enchere> findWaiting();

    @Query("SELECT * FROM enchere WHERE idProduit = :idProduit")
    Optional<Enchere> findByIdProduit(final int idProduit);
}
