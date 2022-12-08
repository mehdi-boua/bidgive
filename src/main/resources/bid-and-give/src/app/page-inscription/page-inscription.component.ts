import { Component, Input } from '@angular/core';
import { user } from '../Interfaces/user';

@Component({
  selector: 'app-page-inscription',
  templateUrl: './page-inscription.component.html',
  styleUrls: ['./page-inscription.component.scss']
})
export class PageInscriptionComponent {

  @Input() nom : string = "";
  @Input() prenom : string = "";
  @Input() pseudo : string = "";
  @Input() mail : string = "";
  @Input() adrpostale : string = "";
  @Input() ville : string = "";
  @Input() cp : number = 0;
  @Input() tel : number = 0;
  @Input() mdp : string = "";

  newuser : user | undefined; 

  addUser(){
    this.newuser!.nom = this.nom;
    this.newuser!.prenom = this.prenom;
    console.log(this.newuser!.nom);
  }
}
