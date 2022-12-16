import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { notification } from '../Interfaces/notification';
import { user } from '../Interfaces/user';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-page-messages',
  templateUrl: './page-messages.component.html',
  styleUrls: ['./page-messages.component.scss']
})
export class PageMessagesComponent {
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
    if(this.global.user.length != 0){
      this.http.get<notification[]>("/api/user/notifs").subscribe(data =>{
        data.forEach(notif => this.notifs.push(notif))
      })
    }

    this.adresse = this.global.user[0].adresse
  }

  messages : boolean = false;
  varencours: boolean = false;
  afficheMsg: boolean = true;
  afficheNotif: boolean = true;

  messagesList = this.global.messages;
  notifList = this.global.notifications;

  notifs: notification[] = []
  identifiant : number = 0;
  expediteur : string = "";
  adresse : string = "";

  filtre(){
    this.messages = !this.messages;
    this.varencours = !this.varencours;
  }

  openMsg(id: number, exp : string) {
    this.identifiant = id;
    this.expediteur = exp;
    document.getElementById("modalmsg"+id)!.classList.remove("hide2");
  }

  Close(id? : number) {
    document.getElementById("container-msg")!.innerHTML="";
    document.getElementById("modalmsg"+id)!.classList.add("hide2");
  }

  /* toggleMessage(index: number) {
    if(document.querySelector("#texte"+index)?.classList.contains('hide')) {
      (document.querySelector("#texte"+index) as HTMLElement).classList.remove('hide');
    } else {
      (document.querySelector("#texte"+index) as HTMLElement)?.classList.add('hide');
    } 
  } */

  /*toggleNotification(index : number, idNotif: number) {
    if(document.querySelector("#texte"+index)?.classList.contains('hide')) {
      (document.querySelector("#texte"+index) as HTMLElement).classList.remove('hide');
    } else {
      (document.querySelector("#texte"+index) as HTMLElement)?.classList.add('hide');
    }

    this.http.request('post', "/api/notif/read", {body: idNotif}).subscribe()
  } */

  Livraison(){
    //console.log("click");
    document.getElementById("content")?.classList.add("hide2");
    document.getElementById("ct-livraison")?.classList.remove("hide2");
  }

  choix() {
    let res = (document.querySelector('input[name=choix]:checked') as HTMLInputElement).value;
    //console.log((document.querySelector('input[name=choix]:checked') as HTMLInputElement).value);
 
      if (res =="remise") {
        document.getElementById("livraison")?.classList.add("hide2");
        document.getElementById("remise")?.classList.remove("hide2");
      } else if (res =="livraison") {
        document.getElementById("livraison")?.classList.remove("hide2");
        document.getElementById("paiement")?.classList.remove("hide2");
        document.getElementById("remise")?.classList.add("hide2");
      }
  }

  mode() {
    console.log((document.getElementById("select") as HTMLSelectElement).value);
    if((document.getElementById("select") as HTMLSelectElement).value == "relai") {
      document.getElementById("choix-relai")?.classList.remove("hide2");
    } else if ((document.getElementById("select") as HTMLSelectElement).value == "domicile") {
      document.getElementById("choix-relai")?.classList.add("hide2");
    }
  }
}
