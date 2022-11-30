package fr.bidgive.api.model;


import lombok.Data;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import javax.persistence.*;

@Data
@Entity
@Table(name="catdescoptions")
public class CategorieDescriptionOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.annotation.Id
    private int id;

    private @Column("idcatdesc") int idCatDesc;

    private String option;
}
