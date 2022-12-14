package fr.bidgive.api.controller;

import fr.bidgive.api.controller.returnBeans.UserReturn;
import fr.bidgive.api.model.Notification;
import fr.bidgive.api.model.Produit;
import fr.bidgive.api.model.User;
import fr.bidgive.api.service.NotificationService;
import fr.bidgive.api.service.ProduitService;
import fr.bidgive.api.service.UserService;
import fr.bidgive.classes.Authentification;
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
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    ProduitService ps;
    @Autowired
    NotificationService ns;


    @GetMapping("/{id}")
    public UserReturn getUser(@PathVariable final int id){
        Optional<User> u = userService.getUser(id);
        return u.map(UserReturn::new).orElse(null);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/get")
    public UserReturn getConnectedUser(HttpServletRequest request){
        HttpSession session = request.getSession();
        String mail = "";
        mail = (String) session.getAttribute("mail");
        Optional<User> u = userService.getUser(mail);

        return u.map(UserReturn::new).orElse(null);

    }

    @CrossOrigin(origins = "*")
    @GetMapping("/enchs")
    public Iterable<Produit> userEncheres(HttpServletRequest request){
        if(request.getSession().getAttribute("idUser") == null)
            return null;

        int idUser = (int) request.getSession().getAttribute("idUser");
        return ps.userEncheres(idUser);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/auth")
    public ResponseEntity auth(@RequestBody Authentification auth, HttpServletRequest request){
        Optional<User> u = userService.getUser(auth);

        if(u.isEmpty()){
            return ResponseEntity.badRequest().build();
        }
        User usr = u.get();
        if(!usr.getPassword().equals(auth.getMdp())){
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

    @CrossOrigin(origins = "*")
    @PostMapping("/new")
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

        if(user.getImage() == null || "".equals(user.getImage()))
            user.setImage("./assets/images_bd/avatar.jpg");

        if(user.getCodePostal() == null)
            user.setCodePostal("");

        user.setSolde(0);

        if(userService.saveUser(user) == null)
            return ResponseEntity.internalServerError().build();

        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request){
        request.getSession().invalidate();
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/update")
    public ResponseEntity updateUser(@RequestBody User user){
        Optional<User> u = userService.getUser(user.getId());
        User dbuser = u.orElse(null);
        
        if(dbuser == null)
            return ResponseEntity.noContent().build();
    
        if(user.getNom() != null)
            dbuser.setNom(user.getNom());

        if(user.getPrenom() != null)
            dbuser.setPrenom(user.getPrenom());

        if(user.getPseudo() != null && !"".equals(user.getPseudo()))
            dbuser.setPseudo(user.getPseudo());

        if(user.getVille() != null && !"".equals(user.getVille()))
            dbuser.setVille(user.getVille());

        if(user.getAdresse() != null && !"".equals(user.getAdresse()))
            dbuser.setAdresse(user.getAdresse());

        if(user.getPassword() != null && !"".equals(user.getPassword()))
            dbuser.setPassword(user.getPassword());

        if(user.getMail() != null && !"".equals(user.getMail()))
            dbuser.setMail(user.getMail());

        if(user.getTelephone() != null)
            dbuser.setTelephone(user.getTelephone());

        if(user.getImage() != null && !"".equals(user.getImage()))
            dbuser.setImage(user.getImage());

        if(user.getCodePostal() != null && !"".equals(user.getCodePostal()))
            dbuser.setCodePostal(user.getCodePostal());

        if(user.getSolde() != 0)
            dbuser.setSolde(user.getSolde());

        if(userService.saveUser(dbuser) == null)
            return ResponseEntity.internalServerError().build();

        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/notifs")
    public Iterable<Notification> notifications(HttpServletRequest request){
        if(request.getSession().getAttribute("idUser") == null)
            return null;
        int idUser = (int) request.getSession().getAttribute("idUser");
        return ns.getNotifs(idUser);
    }
}