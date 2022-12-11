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
@Table(name="favoris")
public class Favori {
    @Id
    @org.springframework.data.annotation.Id
    private @Column("idUser") int idUser;

    private @Column("idProduit") int idProduit;
}
