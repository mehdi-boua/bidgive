package fr.bidgive.api.controller.returnBeans;

import fr.bidgive.api.model.Enchere;
import fr.bidgive.api.model.Produit;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class FicheProduit {
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
    private int nbDonations;
    private int nbParticipants;

    public FicheProduit(Produit produit, Enchere enchere, String donateurPseudo, String meilleurEncherisseur){
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

        this.donateurPseudo = donateurPseudo;
        this.meilleurEnchere = enchere != null ? enchere.getValeur() : this.prixDepart;
        this.nomMeilleurEncherisseur = enchere != null ? meilleurEncherisseur : "Soyez le premier!" ;
    }

}