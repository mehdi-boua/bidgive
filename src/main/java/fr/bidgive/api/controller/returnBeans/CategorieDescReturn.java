package fr.bidgive.api.controller.returnBeans;

import fr.bidgive.api.model.CategorieDescription;

public class CategorieDescReturn {
    private int id;
    private String titre;
    private String description;


    public CategorieDescReturn(CategorieDescription categorieDescription){
        this.id = categorieDescription.getId();
        this.titre = categorieDescription.getTitre();
        this.description = categorieDescription.getDescription();
    }
}
