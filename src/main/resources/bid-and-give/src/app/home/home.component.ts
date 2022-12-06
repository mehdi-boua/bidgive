import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import catalogue from "../../assets/bd_catalogue.json";
import { categorie } from '../Interfaces/categorie';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor( private global : GlobalService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.categories = []
    this.http.get<categorie[]>("/api/cat/all").subscribe(data => {
      data.forEach(cat => this.categories.push(cat))
    })
  }
  catalogue = catalogue
  search : string = "";

  maj: any = null;
  active : boolean = false;
  num: number = 0;

  categories: categorie [] = this.global.categories


  maj_liste(){
    return this.filteredList(this.maj, this.num);
  }

  reset(){
    document.getElementById("btn"+this.num)?.classList.remove("active");
    (document.querySelector(".search") as HTMLInputElement).value ="";
    this.search = "";
    return this.filteredList(null);
  }

  filteredList(e?: any, num?: any) {
    document.getElementById("btn"+this.num)?.classList.remove("active");
    this.maj = null;
    this.num = num;
      return this.catalogue.filter(item => {
      if(e != null) {
        this.maj = e;
        document.getElementById("btn"+num)?.classList.add("active");
        return item.categorie.toLowerCase().includes(this.maj.toLowerCase());
      }
      else {
          this.maj = null;
          return item.nom.toLowerCase().includes(this.search.toLowerCase());
        }     
    })
  }
}