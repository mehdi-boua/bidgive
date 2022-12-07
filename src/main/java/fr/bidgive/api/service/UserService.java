package fr.bidgive.api.service;

import fr.bidgive.api.model.User;
import fr.bidgive.api.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;

    public Optional<User> getUser(final int idUser){
        return  userRepo.findById(idUser);
    }

    public Optional<User> getUser(User user){
        if(user.getPseudo() != null)
            return userRepo.getUserByPseudo(user.getPseudo());
        return userRepo.getUserByMail(user.getMail());
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
