import { OnInit } from "@angular/core";
import catalogue from "../../assets/bd_catalogue.json";
import { association } from "../Interfaces/association";
import { categorie } from "../Interfaces/categorie";
import { Fiche, fiche } from "../Interfaces/fiche";
import { user } from "../Interfaces/user";

export class GlobalService {

    lienImagesCrea = [
        "https://lemagdesanimaux.ouest-france.fr/images/dossiers/2022-09/lapin-erreur-061313.jpg",
        "https://www.spa-lyon.org/wp-content/uploads/2021/04/article1-pixabay.jpg",
        "https://static1.magazine.ribambel.com/articles/2/17/92/@/28498-le-lapin-nain-est-un-animal-calin-joueu-v2_article_big-3.jpeg"
    ]

    infoProduit :any;

    //user = [{nom: "Toto", prenom: "Océane", pseudo : "Océane", solde: "10.00", image:"./assets/images_bd/produit.png" }]

    user : user[] = [];

    /*userList = [{nom: "", prenom: "", pseudo : "", mail :"", adresse: "",  ville:"", CP : "",  solde: "", image:"" },
                {nom: "", prenom: "", pseudo : "", solde: "", image:"" },
                {nom: "", prenom: "", pseudo : "", solde: "", image:"" }] */ 

   // associations : association[] = [];

    categories: categorie[] = [
        {id: 1 ,titre: "High-tech", description:""},
        {id: 2 ,titre: "Meubles", description:""},
        {id: 3 ,titre: "Vêtements", description:""},
        {id: 4 ,titre: "Livres", description:""},
        {id: 5 ,titre: "Électroménager", description:""}
    ]

    tailles = [
        "XS","S","M","L","XL", "XXL", "TU", "Autre"
    ]

    messages = [
        { dest : "abc", expediteur : 'toto', date:"6 nov.", enchere : "Table", image: "./assets/images_bd/produit.png", msg : [
            "bonjour", "test"
        ], statut :"non-lu"},
        { dest : "abc", expediteur : 'titi', date:"8 nov.", enchere : "Piano", image: "./assets/images_bd/produit.png",  msg : [
            "bonjour2"
        ], statut :"lu"}
    ]

    notifications = [
        {
            type: "confirm", title : "Enchère remportée !", description:"Bravo vous avez remporte l'enchere : Table.", texte:"Veuillez confirmer et procedez au paiement", date :"10 nov.", enchere:"Table", image :"./assets/images_app/icon-checked.svg", statut :"lu"
        },
        {
            type: "info", title : "Enchère en cours ", description:"Table : Votre enchère n'est désormais plus la meilleur", texte:"Rendez-vous dans vos favoris pour surenchérir de nouveau.", date :"10 nov.", enchere:"Table", image :"./assets/images_app/icon-hour-black.svg", statut :"lu"
        }
    ]

    copiefiche : Fiche = new Fiche()

    tempoMessage : string[] = [];
}