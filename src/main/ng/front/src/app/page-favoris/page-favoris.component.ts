import { Component } from '@angular/core';
import catalogue from "../../assets/bd_catalogue.json";

@Component({
  selector: 'app-page-favoris',
  templateUrl: './page-favoris.component.html',
  styleUrls: ['./page-favoris.component.scss']
})
export class PageFavorisComponent {
  catalogue = catalogue;
  username : string = "abc";
  listefav : any[] = []

  listFav() {
    return this.catalogue.filter((item, index) => {
      return item.favoris.includes(this.username)
    })


  }


}
