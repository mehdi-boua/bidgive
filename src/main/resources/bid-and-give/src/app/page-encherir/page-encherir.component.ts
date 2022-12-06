import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-page-encherir',
  templateUrl: './page-encherir.component.html',
  styleUrls: ['./page-encherir.component.scss']
})
export class PageEncherirComponent {
  constructor(private service: GlobalService, private route: Router) {}
  ngOnInit(): void {
    if(this.service.user.length == 0 || this.service.user[0].nom =="") {
      this.route.navigate(["/connexion"]);
    }
  }

  produit = this.service.infoProduit;
  montant : number = 0;
  @Input() activated: boolean =false;
  etape: boolean = false;

  verifMontant(e : Event) {
    if(this.montant > this.produit.prix_entree) {
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
