import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  constructor( private service : GlobalService) {}
  @Output("close") close: EventEmitter<any> = new EventEmitter();
  @Input() destinataire : string = "";

  getInput() {
    document.getElementById("container-msg")!.innerHTML += '<p style="padding : 8px 20px; background-color: #f3edf7; margin: 0 15px 8px; font-size: 16px; border-radius: 8px;">'+(document.getElementById("msg") as HTMLInputElement).value +'</p>';
    (document.getElementById("msg") as HTMLInputElement).value = "";
  }
}
