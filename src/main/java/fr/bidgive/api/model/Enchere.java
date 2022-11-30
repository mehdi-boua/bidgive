package fr.bidgive.api.model;

import lombok.Data;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import javax.persistence.*;

@Data
@Entity
@Table(name="enchere")
public class Enchere {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.annotation.Id
    private int id;

    private @Column("idProduit")int idProduit;

    private @Column("idEnchereur") int idEnchereur;

    private int valeur;

    private int etat;
}
