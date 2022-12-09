import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { association } from '../Interfaces/association';
import { user } from '../Interfaces/user';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-page-encherir',
  templateUrl: './page-encherir.component.html',
  styleUrls: ['./page-encherir.component.scss']
})
export class PageEncherirComponent {
  constructor(private service: GlobalService, private route: Router, private http: HttpClient) {}
  ngOnInit(): void {
    /* if(this.service.user.length == 0 || this.service.user[0].nom =="") {
       this.route.navigate(["/connexion"]);
     } */

    if(this.service.user.length == 0 || this.service.user[0].nom =="") {
      this.http.get<user>("/api/user/get",{observe:'response'}).subscribe(data => {
        if (data.body == null) {
          this.route.navigate(["/connexion"]);
        }
        else{
          this.service.user.push(data.body)
        }
      })
    }


    this.produit = this.service.infoProduit;
    console.log(this.produit);

    this.name = [];
    this.http.get<association[]>("/api/association/all").subscribe(data => {
      data.forEach(
        asso => this.name[asso.id] = asso.nom);

    })

    this.logo = [];
    this.http.get<association[]>("/api/association/all").subscribe(data => {
      data.forEach(
        asso => this.logo[asso.id] = asso.logo);

    })
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

  home(){
    this.http.post("/api/ench/new", {
      "idProduit" : this.produit.id,
      "idEnchereur" : this.service.user[0].id,
      "valeur": this.montant
    }).subscribe()

    this.route.navigateByUrl("/home")
  }
}
