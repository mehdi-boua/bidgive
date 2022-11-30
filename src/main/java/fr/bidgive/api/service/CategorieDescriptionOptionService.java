package fr.bidgive.api.service;

import fr.bidgive.api.model.CategorieDescriptionOption;
import fr.bidgive.api.repository.CategorieDescriptionOptionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategorieDescriptionOptionService {
    @Autowired
    CategorieDescriptionOptionRepo catDescOptionRepo;

    public Iterable<CategorieDescriptionOption> getAll(final int idCatDesc){
        return catDescOptionRepo.findAllByCatDescID(idCatDesc);
    }
}
