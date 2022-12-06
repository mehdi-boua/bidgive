import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import catalogue from "../../assets/bd_catalogue.json";
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-card-enchere',
  templateUrl: './card-enchere.component.html',
  styleUrls: ['./card-enchere.component.scss']
})
export class CardEnchereComponent {
  constructor ( private service : GlobalService, private route : Router) {}

  @Input() filter?: typeof catalogue ;
  @Input() full : string ="";

  redirectionFiche(i: any){
    this.service.infoProduit = i;
    console.log(i);
    this.route.navigate(['/produit/'+i.id_meuble]);
  }
}
