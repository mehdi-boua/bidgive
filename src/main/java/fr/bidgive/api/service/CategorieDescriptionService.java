package fr.bidgive.api.service;

import fr.bidgive.api.model.CategorieDescription;
import fr.bidgive.api.model.CategorieDescriptionOption;
import fr.bidgive.api.repository.CategorieDescriptionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategorieDescriptionService {
    @Autowired
    CategorieDescriptionRepo categorieDescriptionRepo;

    @Autowired
    CategorieDescriptionOptionService cdoservice;

    public Iterable<CategorieDescription> getAll(final int idCat){
        return categorieDescriptionRepo.findAllByIdCat(idCat);
    }

    public Iterable<CategorieDescriptionOption> getOptions(final int idDesc){
        return cdoservice.getAll(idDesc);
    }
}
