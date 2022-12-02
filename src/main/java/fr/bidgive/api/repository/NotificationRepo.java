package fr.bidgive.api.repository;

import fr.bidgive.api.model.Notification;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepo extends CrudRepository<Notification, Integer> {
}
