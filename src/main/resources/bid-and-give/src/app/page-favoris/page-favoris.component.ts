import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ɵɵpureFunction2 } from '@angular/core';
import { Router } from '@angular/router';
import catalogue from "../../assets/bd_catalogue.json";
import { user } from '../Interfaces/user';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-page-favoris',
  templateUrl: './page-favoris.component.html',
  styleUrls: ['./page-favoris.component.scss']
})
export class PageFavorisComponent implements OnInit {
  constructor (private route :Router, private global: GlobalService, private http: HttpClient) {}
  ngOnInit(): void {
    if(this.global.user.length == 0 || this.global.user[0].nom =="") {
      this.http.get<user>("/api/user/get",{observe:'response'}).subscribe(data => {
        if (data.body == null) {
          this.route.navigate(["/connexion"]);
        }
        else{
          this.global.user.push(data.body)
        }
      })
    }
  }

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
