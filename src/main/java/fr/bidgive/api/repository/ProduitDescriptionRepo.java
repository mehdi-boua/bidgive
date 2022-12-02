package fr.bidgive.api.repository;

import fr.bidgive.api.model.ProduitDescription;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProduitDescriptionRepo extends CrudRepository<ProduitDescription, Integer> {
}
