package fr.bidgive.api.repository;

import fr.bidgive.api.model.Notification;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepo extends CrudRepository<Notification, Integer> {
    @Query("SELECT * FROM notifications WHERE idUser= :idUser")
    Iterable<Notification> userNotifs(final int idUser);

    @Modifying
    @Query("UPDATE notifications SET etat = 1 WHERE id = :idNotif")
    void markRead(final int idNotif);
}
