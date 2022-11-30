package fr.bidgive.api.repository;

import fr.bidgive.api.model.Livraison;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LivraisonRepo extends CrudRepository<Livraison, Integer> {
}
