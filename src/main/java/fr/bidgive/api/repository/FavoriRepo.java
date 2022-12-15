package fr.bidgive.api.repository;

import fr.bidgive.api.model.Favori;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriRepo extends CrudRepository<Favori, Integer> {
    @Query("SELECT * FROM favoris WHERE idUser = :idUser")
    Iterable<Favori> getUserFavoris(final int idUser);

    @Modifying
    @Query("DELETE FROM `favoris` WHERE `idUser`= :idUser and `idProduit` = :idProduit ")
    void deleteFavori(final int idUser, final int idProduit);
}
