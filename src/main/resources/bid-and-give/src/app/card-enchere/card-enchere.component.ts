import { HttpClient } from '@angular/common/http';
import { AbsoluteSourceSpan } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import catalogue from "../../assets/bd_catalogue.json";
import { association } from '../Interfaces/association';
import { categorie } from '../Interfaces/categorie';
import { produit } from '../Interfaces/produit';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-card-enchere',
  templateUrl: './card-enchere.component.html',
  styleUrls: ['./card-enchere.component.scss']
})
export class CardEnchereComponent implements OnInit {
  constructor ( private service : GlobalService, private route : Router, private http: HttpClient) {}
  ngOnInit(): void {

    this.association = [];
    this.http.get<association[]>("/api/association/all").subscribe(data => {
      data.forEach(
        asso => this.association.push(asso));

    })

    this.link= [];
    this.http.get<association[]>("/api/association/all").subscribe(data => {
      data.forEach(
        asso => this.link[asso.id] = asso.logo);
    })

    this.categories = []
    this.http.get<categorie[]>("/api/cat/all").subscribe(cats =>{
       cats.forEach(cat=>{
        this.categories[cat.id] = cat;
       })
    })
  }
  
  @Input() filter: produit[] = [];
  @Input() full : string ="";
  association : association[] = [];
  categories : categorie[] = [];
  listeImage : string[]= [];
  link : any[] = [];

  getNbImages(i : string){
    let nb = i.split("|");
    return nb.length;
  }

  getCategorie(i :number) {
    var catName = ""
    
    this.service.categories.forEach(element => {
      if(element.id == i){
        catName = element.titre;
      }
    });
    return catName;
  }

  redirectionFiche(i: any){
    this.service.infoProduit = i;
    console.log(i);
    console.log(this.service.infoProduit);
    this.route.navigate(['/produit/'+i.id]);
  }

  fav(idProd: number){
    if(this.service.user.length != 0){
      this.http.post("/api/fav/new", {
        "idUser": this.service.user[0].id,
        "idProduit": idProd
      },{observe:'response'}).subscribe(data=>{},
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
        this.route.navigateByUrl("/mes-favoris")
      });
      for(let i=0; i< this.filter.length; i++){
        if(this.filter[i].id == idProd){
          this.filter.splice(i, 1);
          break
        }
      }
    }
  }
}
