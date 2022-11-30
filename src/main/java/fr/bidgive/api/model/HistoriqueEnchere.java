package fr.bidgive.api.model;

import lombok.Data;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
@Table(name="historiqueencheres")
public class HistoriqueEnchere {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.annotation.Id
    private int id;

    private @Column("idProduit") int idProduit;

    private @Column("idEnchereur") int idEnchereur;

    private int valeur;

}
