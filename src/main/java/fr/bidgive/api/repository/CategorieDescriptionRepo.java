package fr.bidgive.api.repository;

import fr.bidgive.api.model.CategorieDescription;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategorieDescriptionRepo extends CrudRepository<CategorieDescription, Integer> {
    @Query("SELECT * FROM catdescription WHERE idcat = :idCat;")
    public Iterable<CategorieDescription> findAllByIdCat(final int idCat);
}
