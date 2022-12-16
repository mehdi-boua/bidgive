package fr.bidgive.api.service;


import fr.bidgive.api.controller.returnBeans.FicheProduit;
import fr.bidgive.api.model.Enchere;
import fr.bidgive.api.model.Notification;
import fr.bidgive.api.model.Produit;
import fr.bidgive.api.repository.ProduitRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProduitService {
    @Autowired
    ProduitRepo produitRepo;
    @Autowired
    HistoriqueEnchereService hes;
    @Autowired
    EnchereService enchereService;
    @Autowired
    UserService userService;
    @Autowired
    NotificationService notificationService;

    public Iterable<Produit> getAll(){
        return produitRepo.findAll();
    }

    public Iterable<Produit> getAllActive(){
        return produitRepo.activeProduits();
    }

    public Iterable<Produit> getAllWaiting(){
        return produitRepo.findWaiting();
    }

    public Optional<Produit> getProduit(final int id){
        return produitRepo.findById(id);
    }

    public Produit saveProduit(Produit produit){
        Enchere enchere = new Enchere();
        enchere.setIdProduit(produit.getId());
        enchere.setValeur(produit.getPrixDepart() - 1);
        enchere.setIdEnchereur(0);
        enchere.setEtat(-1);

        return produitRepo.save(produit);
    }

    public FicheProduit getFiche(final int id){
        Produit produit = getProduit(id).get();
        Optional<Enchere> e = enchereService.getEnchere(id);
        Enchere enchere = e.orElse(null);
        String donateurPseudo = userService.getUser(produit.getIdDonateur()).get().getPseudo();
        String meilleurEncherisseur = e.isPresent()
                ? userService.getUser(e.get().getIdEnchereur()).get().getPseudo()
                : "Soyez le premier!";

        FicheProduit fp = new FicheProduit(produit, enchere, donateurPseudo, meilleurEncherisseur);
        fp.setNbDonations(this.nbDonations(produit.getIdDonateur()));
        fp.setNbParticipants(hes.nbEncheres(produit.getId()));


        return fp;
    }

    public Iterable<Produit> userEncheres(final int idUser){
        Iterable<Enchere> histo = hes.getUserParticipations(idUser);
        List<Produit> produitList = new ArrayList<>();

        for(Enchere enchere: histo){
            Produit temp = this.getProduit(enchere.getIdProduit()).get();
            produitList.add(temp);
        }

        return produitList;
    }

    public int nbDonations(final int idUser){
        return produitRepo.nbDonations(idUser);
    }

    @Scheduled(cron = "0 */1 * * * *")
    private void updateEtat(){
        Iterable<Produit> produits = getAllActive();
        for(Produit p: produits){
            long elapsedTime;
            if(p.getDureeEnchere() == 5){
                elapsedTime = (System.currentTimeMillis() - p.getDebutEnchere().getTime()) /  (60 * 1000);
            }else{
                elapsedTime = (System.currentTimeMillis() - p.getDebutEnchere().getTime()) /  (3600 * 1000);
            }

            if(elapsedTime >= p.getDureeEnchere()){
                Optional<Enchere> e = enchereService.getEnchere(p.getId());
                if(e.isPresent()){
                    Enchere enchere = e.get();
                    enchere.setEtat(0);
                    enchereService.saveEnchere(enchere);

                    informWinner(enchere);
                }
            }
        }

        Iterable<Enchere> encheres = enchereService.getWaiting();
        for(Enchere e: encheres){
            e.setEtat(1);
            Produit p = this.getProduit(e.getIdProduit()).get();
            // on revient 1,5 s en arrière par sécurité afin de s'assurer que l'enchère se termine bien a la bonne heure
            p.setDebutEnchere(new Timestamp(System.currentTimeMillis() - 1500));
            enchereService.saveEnchere(e);
            this.saveProduit(p);

        }
    }

    private void informWinner(Enchere enchere){
        Produit produit = this.getProduit(enchere.getIdProduit()).get();

        Notification n = new Notification();
        n.setIdUser(enchere.getIdEnchereur());
        n.setTitre("Enchère remportée !");
        n.setMessage("Félicitations!!!\n" +
                "Vous avez remporté l'enchère pour "+ produit.getDesignation() + "\n" +
                "Veuillez valider votre enchère, et prendre contact avec le donateur pour " +
                "récupérer votre bien.");

        notificationService.save(n);
    }
}
