import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { association } from '../Interfaces/association';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-page-encherir',
  templateUrl: './page-encherir.component.html',
  styleUrls: ['./page-encherir.component.scss']
})
export class PageEncherirComponent {
  constructor(private service: GlobalService, private route: Router, private http: HttpClient) {}
  ngOnInit(): void {
    this.produit = this.service.infoProduit;
    console.log(this.produit);

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
   /* if(this.service.user.length == 0 || this.service.user[0].nom =="") {
      this.route.navigate(["/connexion"]);
    } */
  }

  produit: any;
  name: any[] = [];
  logo: any[] = [];
  montant : number = 0;
  @Input() activated: boolean =false;
  etape: boolean = false;

  verifMontant(e : Event) {
    if(this.montant > this.produit.prixDepart) {
      this.activated = true;
      (document.querySelector('#error') as HTMLElement).innerHTML= "";
    } else {
      this.activated = false;
      (document.querySelector('#error') as HTMLElement).innerHTML= "Le montant saisi est trop faible";
    }
  }

  etapeSuivante() {
    this.etape = true;
  }

  etapePrecedente() {
    this.etape = false;
  }
}
