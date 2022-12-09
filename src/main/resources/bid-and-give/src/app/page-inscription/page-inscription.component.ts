import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { user } from '../Interfaces/user';

@Component({
  selector: 'app-page-inscription',
  templateUrl: './page-inscription.component.html',
  styleUrls: ['./page-inscription.component.scss']
})

export class PageInscriptionComponent {
  errorMessage: any;
  constructor(private http: HttpClient) { }

  @Input() nom: string = "";
  @Input() prenom: string = "";
  @Input() pseudo: string = "";
  @Input() mail: string = "";
  @Input() adrpostale: string = "";
  @Input() ville: string = "";
  @Input() cp: number = 0;
  @Input() tel: number = 0;
  @Input() mdp: string = "";

  newuser: user = {
    id: 0,
    nom: "",
    prenom: "",
    pseudo: "",
    mail: "",
    password: "",
    ville: "",
    adresse: "",
    telephone: "",
    solde: 0,
    image: '',
    codePostal: ""
  };

  addUser() {
    this.newuser.nom = this.nom;
    this.newuser.prenom = this.prenom;
    this.newuser.pseudo = this.pseudo;
    this.newuser.mail = this.mail;
    this.newuser.password = this.mdp;
    this.newuser.ville = this.ville;
    this.newuser.adresse = this.adrpostale;
    this.newuser.telephone = this.tel.toString();
    this.newuser.codePostal = this.cp.toString();

    console.log(this.newuser);

    if (this.newuser.mail != "" && this.newuser.password != "" && this.newuser.ville != "" && this.newuser.codePostal != "" && this.newuser.pseudo != "") {
      this.http.post<any>('/api/user/new', this.newuser).subscribe({
        next: data => {
          document.querySelector('#error')!.classList.add('hide');
          document.querySelector('#confirm')!.classList.remove('hide');
      },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      })
    } else {
      document.querySelector('#error')!.classList.remove('hide');
    }
  }
}
