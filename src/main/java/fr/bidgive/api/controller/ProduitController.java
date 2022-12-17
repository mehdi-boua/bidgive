package fr.bidgive.api.controller;

import fr.bidgive.api.controller.returnBeans.FicheProduit;
import fr.bidgive.api.controller.returnBeans.ProdDescReturn;
import fr.bidgive.api.model.Produit;
import fr.bidgive.api.model.ProduitDescription;
import fr.bidgive.api.service.ProduitDescriptionService;
import fr.bidgive.api.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/prod")
public class ProduitController {
    @Autowired
    ProduitService produitService;

    @Autowired
    ProduitDescriptionService prodDescService;

    @CrossOrigin(origins = "*")
    @GetMapping("/all")
    public Iterable<Produit> tous(){
        return produitService.getAll();
    }
/*    public Iterable<Produit> tous(){
        List<Produit> list = new ArrayList<>();
        produitService.getAllActive().forEach(list::add);
        produitService.getAllWaiting().forEach(list::add);
        return list;
    }*/

    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    public Optional<Produit> un(@PathVariable final int id){
        return produitService.getProduit(id);
    }

    @GetMapping("/{id}/fiche")
    public FicheProduit getFiche(@PathVariable("id") final int idProduit){
        return produitService.getFiche(idProduit);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/new")
    public Produit createProduit(@RequestBody Produit produit, HttpServletRequest request){
        HttpSession session = request.getSession();
        if(produit.getDesignation() == null)
            produit.setDesignation("");
        if(produit.getDescription() == null)
            produit.setDescription("");
        if(produit.getLienImages() == null)
            produit.setLienImages("");

        produit.setIdDonateur((int)session.getAttribute("idUser"));
        produit.setDebutEnchere(new Timestamp(System.currentTimeMillis()));
        produit.setNomVille((String) session.getAttribute("ville"));

        Produit p = null;
        try {
            p = produitService.saveProduit(produit);

        }
        catch (Exception e){
            e.printStackTrace();
        }
        return p;
    }

    @GetMapping("/{id}/desc")
    public List<ProdDescReturn> produitDescriptions(@PathVariable("id") final int idProduit){
        return prodDescService.prodDesc(idProduit);
    }

    @PostMapping("/{id}/desc/new")
    public ProduitDescription produitDescriptions(@RequestBody ProduitDescription prodDesc,
                                                            @PathVariable("id") final int idProduit){
        prodDesc.setIdProduit(idProduit);

        return prodDescService.save(prodDesc);
    }
}
