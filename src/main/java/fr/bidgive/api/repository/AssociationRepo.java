package fr.bidgive.api.repository;

import fr.bidgive.api.model.Association;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssociationRepo extends CrudRepository<Association, Integer> {
}
