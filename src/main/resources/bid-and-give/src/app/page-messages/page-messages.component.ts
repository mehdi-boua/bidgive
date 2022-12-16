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
  }

  messages : boolean = false;
  varencours: boolean = false;
  afficheMsg: boolean = true;
  afficheNotif: boolean = true;

  messagesList = this.global.messages;
  notifList = this.global.notifications;

  notifs: notification[] = []

  filtre(){
    this.messages = !this.messages;
    this.varencours = !this.varencours;
  }

  toggleMessage(index: number) {
    if(document.querySelector("#texte"+index)?.classList.contains('hide')) {
      (document.querySelector("#texte"+index) as HTMLElement).classList.remove('hide');
    } else {
      (document.querySelector("#texte"+index) as HTMLElement)?.classList.add('hide');
    }
    
    
  }

  toggleNotification(index : number, idNotif: number) {
    if(document.querySelector("#texte"+index)?.classList.contains('hide')) {
      (document.querySelector("#texte"+index) as HTMLElement).classList.remove('hide');
    } else {
      (document.querySelector("#texte"+index) as HTMLElement)?.classList.add('hide');
    }

    this.http.request('post', "/api/notif/read", {body: idNotif}).subscribe()
  }
}
