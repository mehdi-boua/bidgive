package fr.bidgive.api.controller;

import fr.bidgive.api.controller.returnBeans.UserReturn;
import fr.bidgive.api.model.User;
import fr.bidgive.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.net.http.HttpResponse;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/get")
    @CrossOrigin(origins = "*")
    public UserReturn getUser(HttpServletRequest request){
        HttpSession session = request.getSession();
        String mail = "";
        mail = (String) session.getAttribute("mail");
        Optional<User> u = userService.getUser(mail);

        return u.map(UserReturn::new).orElse(null);

    }

    @CrossOrigin(origins = "*")
    @PostMapping("/auth")
    public ResponseEntity auth(@RequestBody User user, HttpServletRequest request){
        Optional<User> u = userService.getUser(user);

        if(u.isEmpty()){
            return ResponseEntity.badRequest().build();
        }
        User usr = u.get();
        if(!usr.getPassword().equals(user.getPassword())){
            return ResponseEntity.noContent().build();
        }

        HttpSession session = request.getSession();
        session.setAttribute("prenom", usr.getPrenom());
        session.setAttribute("nom", usr.getNom());
        session.setAttribute("pseudo", usr.getPseudo());
        session.setAttribute("idUser", usr.getId());
        session.setAttribute("mail", usr.getMail());
        session.setAttribute("solde", usr.getSolde());
        session.setAttribute("telephone", usr.getTelephone());
        session.setAttribute("adresse", usr.getAdresse());
        session.setAttribute("ville", usr.getVille());


        return ResponseEntity.ok().build();
    }

    @GetMapping("/logout")
    @CrossOrigin(origins = "*")
    public ResponseEntity logout(HttpServletRequest request){
        request.getSession().invalidate();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/new")
    @CrossOrigin(origins = "*")
    public ResponseEntity createUser(@RequestBody User user){
        if(user.getNom()== null)
            user.setNom("");

        if(user.getPrenom()== null)
            user.setPrenom("");

        if(user.getPseudo()== null || "".equals(user.getPassword()))
            user.setPseudo(user.getNom().toLowerCase().charAt(0) + user.getPrenom().toLowerCase());

        if(user.getVille()== null)
            user.setVille("");

        if(user.getAdresse() == null)
            user.setAdresse("");

        if(user.getPassword()== null || "".equals(user.getPassword()))
            user.setPassword(user.getPrenom().toLowerCase());

        if(user.getMail()== null || "".equals(user.getMail()))
            user.setMail(user.getPrenom()+"@mail.fr");

        if(user.getTelephone() == null)
            user.setTelephone("");

        user.setSolde(0);

        if(userService.saveUser(user) == null)
            return ResponseEntity.internalServerError().build();

        return ResponseEntity.ok().build();
    }

    @PutMapping("/update")
    @CrossOrigin(origins = "*")
    public ResponseEntity updateUser(@RequestBody User user){
        if(user.getNom() != null)
            user.setNom("");

        if(user.getPrenom()!= null)
            user.setPrenom("");

        if(user.getPseudo()!= null || "".equals(user.getPassword()))
            user.setPseudo(user.getNom().toLowerCase().charAt(0) + user.getPrenom().toLowerCase());

        if(user.getVille() != null)
            user.setVille("");

        if(user.getAdresse() != null)
            user.setAdresse("");

        if(user.getPassword() != null || "".equals(user.getPassword()))
            user.setPassword(user.getPrenom().toLowerCase());

        if(user.getMail() != null || "".equals(user.getMail()))
            user.setMail(user.getPrenom()+"@mail.fr");

        if(user.getTelephone() != null)
            user.setTelephone("");

        user.setSolde(0);

        if(userService.saveUser(user) != null)
            return ResponseEntity.internalServerError().build();

        return ResponseEntity.ok().build();
    }
}

