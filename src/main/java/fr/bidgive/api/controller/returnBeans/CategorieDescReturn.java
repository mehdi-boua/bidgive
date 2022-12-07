package fr.bidgive.api.controller.returnBeans;

import fr.bidgive.api.model.CategorieDescription;

public class CategorieDescReturn {
    private int id;
    private String titre;
    private String description;
    private boolean options;

    public CategorieDescReturn(CategorieDescription categorieDescription){
        this.id = categorieDescription.getId();
        this.titre = categorieDescription.getTitre();
        this.description = categorieDescription.getDescription();
        this.options = categorieDescription.isOptions();
    }

    public int getId() {
        return id;
    }

    public String getTitre() {
        return titre;
    }

    public String getDescription() {
        return description;
    }

    public boolean getOptions(){
        return this.options;
    }
}
