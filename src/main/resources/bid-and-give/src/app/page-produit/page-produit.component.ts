import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { association } from '../Interfaces/association';
import { fiche, Fiche } from '../Interfaces/fiche';
import { prodDesc, prodDesc2 } from '../Interfaces/prodDesc';
import { GlobalService } from '../services/global.service';


@Component({
  selector: 'app-page-produit',
  templateUrl: './page-produit.component.html',
  styleUrls: ['./page-produit.component.scss']
})
export class PageProduitComponent implements OnInit{
  constructor(private service : GlobalService, private http: HttpClient, private route : Router ) {}
  ngOnInit(): void {
    this.elemProduit = this.service.infoProduit;
    this.elemProduit.nomVille = this.elemProduit.nomVille.charAt(0).toUpperCase() + this.elemProduit.nomVille.slice(1) ;
    this.getImages();

    this.assoc = [];
    this.http.get<association[]>("/api/association/all").subscribe(data => {
      data.forEach(
        asso => this.assoc[asso.id] = (asso));
    })

    var url = "/api/prod/"+this.elemProduit.id+"/fiche"
    this.http.get<fiche>(url).subscribe(data =>{
      this.fiche.id = data.id
      this.fiche.designation = data.designation
      this.fiche.description = data.description
      this.fiche.idCategorie = data.idCategorie
      this.fiche.lienImages = data.lienImages
      this.fiche.nomVille = data.nomVille
      this.fiche.prixDepart = data.prixDepart
      this.fiche.prixReserve = data.prixReserve
      this.fiche.dureeEnchere = data.dureeEnchere
      this.fiche.debutEnchere = data.debutEnchere
      this.fiche.idAssociation = data.idAssociation
      this.fiche.idLivrison = data.idLivrison
      this.fiche.idDonateur = data.idDonateur
      this.fiche.donateurPseudo = data.donateurPseudo
      this.fiche.meilleurEnchere = data.meilleurEnchere
      this.fiche.nomMeilleurEncherisseur = data.nomMeilleurEncherisseur
      this.fiche.nbDonations = data.nbDonations
      this.fiche.nbParticipants = data.nbParticipants
    })

    url = "/api/prod/"+this.elemProduit.id+"/desc"
    this.http.get<prodDesc2[]>(url).subscribe(data=>{
      data.forEach(elem => this.prodDesc.push(elem))
    })


  }

  fiche: Fiche = new Fiche()
  elemProduit : any;
  listeImage : string[] = [];
  assoc : association[] = []
  prodDesc : prodDesc2[] = []

  getImages() {
    this.listeImage= this.elemProduit.lienImages.split("|");
    console.log(this.listeImage);
  }

  getDonateur () {
    return this.fiche.donateurPseudo
  }

  redirection(i: any){
    this.service.infoProduit = i;
    console.log(i);
    console.log(this.service.infoProduit);
    this.route.navigate(['encherir/']);
  }

  fav(idProd: number){
    if(this.service.user.length != 0){
      this.http.post("/api/fav/new", {
        "idUser": this.service.user[0].id,
        "idProduit": idProd
      },{observe:'response'}).subscribe(data=>{
        (document.querySelector("#fav")!as HTMLImageElement).src = "/assets/images_app/icon-hearth-full.svg"
      },
      () =>{
        this.unfav(idProd)
      });
    }
  }
  unfav(idProd: number){
    if(this.service.user.length != 0){
      this.http.request('delete',"/api/fav/delete",{body:{
        "idUser": this.service.user[0].id,
        "idProduit": idProd}
      }).subscribe(()=>{
        (document.querySelector("#fav")!as HTMLImageElement).src = "/assets/images_app/icon-hearth-stroke.svg"
      });
    }
  }
}
