package fr.bidgive.api.model;

import lombok.Data;
import org.springframework.data.relational.core.mapping.Table;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.annotation.Id
    private int id;

    private String nom;

    private String prenom;

    private String pseudo;

    private String ville;

    private String mail;

    private String password;

    private String adresse;

    private String telephone;

    private float solde;
}
