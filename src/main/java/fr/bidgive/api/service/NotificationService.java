package fr.bidgive.api.service;

import fr.bidgive.api.model.Notification;
import fr.bidgive.api.repository.NotificationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    @Autowired
    NotificationRepo notificationRepo;

    public Iterable<Notification> getNotifs(final int idUser){
        return notificationRepo.findAll();
    }

    public void markRead(final int idNotif){
        notificationRepo.markRead(idNotif);
    }

    public Notification save(Notification notification){
        return notificationRepo.save(notification);
    }

}
