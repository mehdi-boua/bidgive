package fr.bidgive.api.controller;

import fr.bidgive.api.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notif")
public class NotificationController {
    @Autowired
    NotificationService notificationService;

    @CrossOrigin(origins = "*")
    @PostMapping("/read")
    public void markAsRead(@RequestBody int idNotif){
        notificationService.markRead(idNotif);
    }
}
