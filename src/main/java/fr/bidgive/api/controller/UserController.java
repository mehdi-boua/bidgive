package fr.bidgive.api.controller;

import fr.bidgive.api.model.User;
import fr.bidgive.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.net.http.HttpResponse;
import java.util.Optional;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/auth")
    public ResponseEntity auth(@RequestBody User user, HttpServletRequest request){
        Optional<User> u = userService.getUser(user);

        if(u.isEmpty()){
            //TODO: replace redirect by link to login page
            return ResponseEntity.badRequest().build();
        }
        User usr = u.get();
        if(!usr.getPassword().equals(user.getPassword())){
            return ResponseEntity.noContent().build();
        }

        HttpSession session = request.getSession();
        session.setAttribute("prenom", usr.getPrenom());
        session.setAttribute("nom", usr.getNom());
        session.setAttribute("idUser", usr.getId());
        session.setAttribute("mail", usr.getMail());
        session.setAttribute("solde", usr.getSolde());
        session.setAttribute("telephone", usr.getTelephone());
        session.setAttribute("adresse", usr.getAdresse());
        session.setAttribute("ville", usr.getVille());


        return ResponseEntity.ok().build();
    }

    @GetMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request){
        request.getSession().invalidate();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/newuser")
    public User createUser(@RequestBody User user){
        return userService.saveUser(user);
    }
}

