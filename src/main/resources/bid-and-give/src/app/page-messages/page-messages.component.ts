import { Component } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-page-messages',
  templateUrl: './page-messages.component.html',
  styleUrls: ['./page-messages.component.scss']
})
export class PageMessagesComponent {
  constructor(private service : GlobalService) {}
  messages : boolean = true;
  varencours: boolean = true;
  afficheMsg: boolean = false;
  afficheNotif: boolean = false;

  messagesList = this.service.messages;
  notifList = this.service.notifications;

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

  toggleNotification(index : number) {
    if(document.querySelector("#texte"+index)?.classList.contains('hide')) {
      (document.querySelector("#texte"+index) as HTMLElement).classList.remove('hide');
    } else {
      (document.querySelector("#texte"+index) as HTMLElement)?.classList.add('hide');
    }
  }
}
