package fr.bidgive.api.repository;

import fr.bidgive.api.model.Categorie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategorieRepo extends CrudRepository<Categorie, Integer> {
}
