package fr.bidgive.api.service;

import fr.bidgive.api.model.Association;
import fr.bidgive.api.repository.AssociationRepo;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Data
@Service
public class AssociationService {
    @Autowired
    private AssociationRepo associationRepo;

    public Optional<Association> getAssociation(final int id){
        return associationRepo.findById(id);
    }

    public Iterable<Association> getAssociations(){
        return associationRepo.findAll();
    }

    public void deleteAssociation(final int id){
        associationRepo.deleteById(id);
    }

    public Association saveAssociation(Association association){
        return associationRepo.save(association);
    }
}
