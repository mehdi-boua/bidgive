package fr.bidgive.api.model;
import lombok.Data;

import org.springframework.data.relational.core.mapping.Table;

import javax.persistence.*;

@Data
@Entity
@Table(name="associations")
public class Association {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.annotation.Id
    private int id;

    private String nom;

    private String description;

    private String lien;

    private String logo;

}
