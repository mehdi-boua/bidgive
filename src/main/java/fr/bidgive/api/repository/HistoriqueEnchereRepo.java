package fr.bidgive.api.repository;

import fr.bidgive.api.model.HistoriqueEnchere;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoriqueEnchereRepo extends CrudRepository<HistoriqueEnchere, Integer> {
    @Query("SELECT * FROM historiqueencheres WHERE idproduit = :idProduit")
    public Iterable<HistoriqueEnchere> findAllByIdProduit(final int idProduit);

    @Query("select count(*) from historiqueencheres where idproduit = :idProduit")
    int nbEncheres(final int idProduit);

    @Query("select count(distinct(idEnchereur)) from historiqueencheres " +
            "where idproduit = :idProduit")
    int nbParticipants(final int idProduit);
}
