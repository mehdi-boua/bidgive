import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { produit } from '../Interfaces/produit';
import { user } from '../Interfaces/user';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-page-compte',
  templateUrl: './page-compte.component.html',
  styleUrls: ['./page-compte.component.scss']
})
export class PageCompteComponent implements OnInit {
  errorMessage: any;

  constructor(private service: GlobalService, @Inject(Router) private route: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if (this.service.user.length == 0 || this.service.user[0].nom == "") {
      this.http.get<user>("/api/user/get", { observe: 'response' }).subscribe(data => {
        if (data.body == null) {
          this.route.navigate(["/connexion"]);
        } else {
          this.service.user.push(data.body)
          //console.log(this.service.user)
        }
      })
    }
    setTimeout(() => { 
    this.dons = [];
    this.http.get<produit[]>("/api/prod/all").subscribe(data => {
      data.forEach(don => {
        if(don.idDonateur == this.user[0].id) {
          this.dons.push(don);
        }
      })
    })
    console.log(this.dons);

    this.encheres = [];
    this.http.get<any[]>("/api/user/enchs").subscribe(data => {
      data.forEach(ench => {
        this.encheres.push(ench);
      })
    })
    console.log("encheres"+this.encheres);
    }, 5000)
  }


  user = this.service.user;
  avatar: string = "";
  elt: any;
  dons: produit[] = [];
  encheres : any[] = [];

  toggleMore(e: Event) {
    let evt = e.currentTarget as HTMLInputElement;
    evt.nextElementSibling!.classList.toggle("hide");
  }

  toggleInfos() {
    let doc = document.querySelector('#infosUser');
    doc!.classList.toggle('hide');
  }

  toggleDons() {
    let sel = document.querySelector('#hide-dons');
    sel!.classList.toggle('hide-dons');
  }

  Ajouter(e: Event) {
    this.elt = (e.currentTarget! as HTMLElement).previousElementSibling;
    let elt2 = (e.currentTarget! as HTMLElement).nextElementSibling;
    console.log(this.elt);
    this.elt?.setAttribute('contentEditable', 'true');
    this.elt?.classList.add("editable");
    elt2?.classList.remove('hide');
    return this.elt;
  }

  Confirmer(e: Event) {
   this.elt?.setAttribute('contentEditable', 'false');
   this.elt?.classList.remove("editable");

    (e.currentTarget as HTMLElement).classList.add('hide');
    this.user[0].password = sessionStorage.getItem("mdp");
    this.user[0].telephone = document.getElementById('tel')!.innerHTML.toString();
    this.user[0].codePostal = document.getElementById('cp')!.innerHTML.toString(); 
    this.user[0].adresse = document.getElementById('adresse')!.innerHTML;
    this.user[0].ville = document.getElementById('ville')!.innerHTML; 

    console.log(this.user[0].nom);
    console.log(this.user[0]);


    this.http.put<any>('/api/user/update', this.user[0]).subscribe({
       next: data => {
         console.log("ok");
     },
       error: error => {
         this.errorMessage = error.message;
         console.error('There was an error!', error);
       }
     }) 

  }

  updateImage() {
    this.user[0].image = this.avatar;
    this.user[0].password = sessionStorage.getItem("mdp");
    this.http.put<any>('/api/user/update', this.user[0]).subscribe({
      next: data => {
        console.log("ok");
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }

  disconnect() {
    this.http.get("/api/user/logout").subscribe();
    this.service.user = [];
    sessionStorage.removeItem("mdp");
    this.route.navigateByUrl('/home');
  }
}
