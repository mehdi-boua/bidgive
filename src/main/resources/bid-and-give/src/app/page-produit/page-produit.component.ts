import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { association } from '../Interfaces/association';
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
    this.getImages();

    this.link = [];
    this.http.get<association[]>("/api/association/all").subscribe(data => {
      data.forEach(
        asso => this.link.push(asso.lien));
    })

    this.name = [];
    this.http.get<association[]>("/api/association/all").subscribe(data => {
      data.forEach(
        asso => this.name.push(asso.nom));

    })

    this.logo = [];
    this.http.get<association[]>("/api/association/all").subscribe(data => {
      data.forEach(
        asso => this.logo.push(asso.logo));

    })
  }

  elemProduit : any;
  listeImage : string[]= [];
  link : string[] = [];
  name : string[] = [];
  logo : string[] = [];

  getImages() {
    this.listeImage= this.elemProduit.lienImages.split("|");
    console.log(this.listeImage);
  }

  getDonateur () {
    /* TODO */
  }

  redirection(i: any){
    this.service.infoProduit = i;
    console.log(i);
    console.log(this.service.infoProduit);
    this.route.navigate(['encherir/']);
  }

}
