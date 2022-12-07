package fr.bidgive.api.controller;


import fr.bidgive.api.model.Favori;
import fr.bidgive.api.service.FavoriService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fav")
public class FavoriController {

    @Autowired
    FavoriService favoriService;

    @GetMapping("/{idUser}")
    public Iterable<Favori> getFavs (@PathVariable final int idUser){
        return favoriService.getAll(idUser);
    }

    @PostMapping("/new")
    public Favori createFav(@RequestBody Favori favori){
        return favoriService.newFavori(favori.getIdProduit(), favori.getIdUser());
    }

    @DeleteMapping("/delete")
    public void deleteFav(@RequestBody Favori favori){
        favoriService.deleteFavori(favori);
    }
}
