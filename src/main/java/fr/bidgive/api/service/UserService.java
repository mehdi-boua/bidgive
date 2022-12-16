package fr.bidgive.api.service;

import fr.bidgive.api.model.Produit;
import fr.bidgive.api.model.User;
import fr.bidgive.api.repository.UserRepo;
import fr.bidgive.classes.Authentification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;

    @Autowired
    HistoriqueEnchereService hes;

    public Optional<User> getUser(final int idUser){
        return  userRepo.findById(idUser);
    }

    public Optional<User> getUser(Authentification auth){
        Optional<User> u = userRepo.getUserByPseudo(auth.getIdentifiant());
        if(u.isPresent())
            return u;
        return userRepo.getUserByMail(auth.getIdentifiant());
    }

    public Optional<User> getUser(String mail){
        return userRepo.getUserByMail(mail);
    }

    public User saveUser(User user){
        return userRepo.save(user);
    }

    public void deleteUser(User user){
        userRepo.deleteById(user.getId());
    }

    public void deleteUser(int id){
        userRepo.deleteById(id);
    }
}
