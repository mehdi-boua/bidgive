package fr.bidgive.api.model;

import lombok.Data;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import javax.persistence.*;

@Data
@Entity
public @Table(name="notifications") class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.annotation.Id
    private int id;

    private @Column("idUser") int idUser;

    private String titre;

    private String message;

    private int etat;
}
