package fr.bidgive.api.model;

import lombok.Data;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@Data
@Entity
@Table(name="produits")
public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.annotation.Id
    private int id;

    private String designation;

    private String description;

    private @Column("idDonateur") int idDonateur;

    private @Column("idCategorie") int idCategorie;

    private @Column("lienImages") String lienImages;

    private @Column("nomVille") String nomVille;

    private @Column("prixDepart") int prixDepart;

    private @Column("prixReserve") int prixReserve;

    private @Column("dureeEnchere") int dureeEnchere; // nombre total d'heures

    private @Column("debutEnchere") Timestamp debutEnchere;

    private @Column("idAssociation") int idAssociation;

    private @Column("idLivraison") boolean idLivrison;

}
