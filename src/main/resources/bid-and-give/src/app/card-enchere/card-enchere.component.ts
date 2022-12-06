import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import catalogue from "../../assets/bd_catalogue.json";
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
    throw new Error('Method not implemented.');
  }
  

  @Input() filter?: produit[] ;
  @Input() full : string ="";

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
    this.route.navigate(['/produit/'+i.id_meuble]);
  }
}
