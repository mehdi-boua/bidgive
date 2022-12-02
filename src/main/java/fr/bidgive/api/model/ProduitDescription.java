package fr.bidgive.api.model;

import org.springframework.data.relational.core.mapping.Column;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="produitDescription")
public class ProduitDescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.annotation.Id
    private int id;

    private @Column("idProduit") int idProduit;

    private @Column("idCatDesc") int idCatDesc;

    private @Column("opt") String option;
}
