package fr.bidgive.api.controller.returnBeans;

import fr.bidgive.api.model.User;

public class UserReturn {
    private int id;
    private String nom;
    private String prenom;
    private String pseudo;
    private String ville;
    private String mail;
    private String adresse;
    private String telephone;
    private float solde;
    private String image;
    private String codePostal;

    public UserReturn(User user){
        this.id = user.getId();
        this.nom = user.getNom();
        this.prenom = user.getPrenom();
        this.pseudo = user.getPseudo();
        this.ville = user.getVille();
        this.mail = user.getMail();
        this.adresse = user.getAdresse();
        this.telephone = user.getTelephone();
        this.solde = user.getSolde();
        this.image = user.getImage();
        this.codePostal = user.getCodePostal();
    }

    public int getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public String getPseudo() {
        return pseudo;
    }

    public String getVille() {
        return ville;
    }

    public String getMail() {
        return mail;
    }

    public String getAdresse() {
        return adresse;
    }

    public String getTelephone() {
        return telephone;
    }

    public float getSolde() {
        return solde;
    }

    //TODO: add to db
    public String getImage() {
        return image;
    }

    public String getCodePostal() {
        return codePostal;
    }
}
