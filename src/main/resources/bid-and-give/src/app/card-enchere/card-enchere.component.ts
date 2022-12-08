import { HttpClient } from '@angular/common/http';
import { AbsoluteSourceSpan } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
        asso => this.link.push(asso.logo));
    })
  }
  
  @Input() filter?: produit[] ;
  @Input() full : string ="";
  association : association[] = [];
  listeImage : string[]= [];
  link : any[] = [];

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
}
