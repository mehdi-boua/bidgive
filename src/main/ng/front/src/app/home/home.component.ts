import { Component, Input } from '@angular/core';
import catalogue from "../../assets/bd_catalogue.json";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  catalogue = catalogue
  search : string = "";
  liste: any[] = this.searchList();
  maj: any = null;

  categories = [
    "High-tech","Meubles","Vêtements","Livres","Électroménager"
  ]

  //Lastitem

  searchList() {
    return this.catalogue.filter(item => {
      return item.nom.toLowerCase().includes(this.search.toLowerCase())
    })
  }

  maj_liste(){
    return this.filteredList(this.maj);
  }

  reset(){
    return this.filteredList(null);
  }

  filteredList(e?: any) {
    this.maj = null;
    console.log(e);
      return this.catalogue.filter(item => {
      if(e != null) {
        this.maj = e;
        return item.categorie.toLowerCase().includes(this.maj.toLowerCase());
      }
      else {
          console.log("ici2"+ this.search);
          this.maj = null;
          return item.nom.toLowerCase().includes(this.search.toLowerCase());
        }     
    })
  }
}