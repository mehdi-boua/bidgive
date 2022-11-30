package fr.bidgive.api.repository;

import fr.bidgive.api.model.CategorieDescriptionOption;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategorieDescriptionOptionRepo extends CrudRepository<CategorieDescriptionOption, Integer> {

    @Query("SELECT * FROM catdescoptions WHERE idcatdesc = :idCatDesc")
    public Iterable<CategorieDescriptionOption> findAllByCatDescID(final int idCatDesc);
}
