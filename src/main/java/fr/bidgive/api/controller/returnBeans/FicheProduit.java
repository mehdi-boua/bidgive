package fr.bidgive.api.controller.returnBeans;

import fr.bidgive.api.model.Enchere;
import fr.bidgive.api.model.Produit;
import fr.bidgive.api.model.User;
import fr.bidgive.api.service.EnchereService;
import fr.bidgive.api.service.UserService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.mapping.Column;

import java.sql.Timestamp;
import java.util.Optional;

@Data
public class FicheProduit {
    @Autowired
    UserService userService;
    @Autowired
    EnchereService enchereService;

    private int id;
    private String designation;
    private String description;
    private int idCategorie;
    private String lienImages;
    private String nomVille;
    private int prixDepart;
    private int prixReserve;
    private int dureeEnchere;
    private Timestamp debutEnchere;
    private int idAssociation;
    private boolean idLivrison;
    private int idDonateur;
    private String donateurPseudo;
    private int meilleurEnchere;
    private String nomMeilleurEncherisseur;

    public FicheProduit(Produit produit){
        this.id = produit.getId();
        this.designation = produit.getDesignation();
        this.description = produit.getDescription();
        this.idCategorie = produit.getIdCategorie();
        this.lienImages = produit.getLienImages();
        this.nomVille = produit.getNomVille();
        this.prixDepart = produit.getPrixDepart();
        this.prixReserve = produit.getPrixReserve();
        this.dureeEnchere = produit.getDureeEnchere();
        this.debutEnchere = produit.getDebutEnchere();
        this.idAssociation = produit.getIdAssociation();
        this.idLivrison = produit.isIdLivrison();
        this.idDonateur = produit.getIdDonateur();
        this.init();
    }

    private void init(){
        Optional<Enchere> e =  enchereService.getEnchere(this.id);

        this.donateurPseudo = userService.getUser(this.idDonateur).get().getPseudo();
        this.meilleurEnchere = e.isPresent() ? e.get().getValeur() : this.prixDepart;
        this.nomMeilleurEncherisseur = e.isPresent() ? userService.getUser(e.get().getIdEnchereur()).get().getPseudo()
                : "Soyez le premier!" ;

    }
}
