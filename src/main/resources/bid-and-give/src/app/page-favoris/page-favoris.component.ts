import { Component, ɵɵpureFunction2 } from '@angular/core';
import catalogue from "../../assets/bd_catalogue.json";

@Component({
  selector: 'app-page-favoris',
  templateUrl: './page-favoris.component.html',
  styleUrls: ['./page-favoris.component.scss']
})
export class PageFavorisComponent {
  catalogue = catalogue;
  username : string = "abc";
  listefav = this.listeFav();
  varencours: boolean = true;
  varexpirees: boolean = false;

  enCours(){
    this.varencours = true;
    this.varexpirees = false;
  }

  expirees(){
    this.varencours = false;
    this.varexpirees = true;
  }

  listeFav() {
    return this.catalogue.filter((item, index) => {
      return item.favoris.includes(this.username)
    })
  }
}
