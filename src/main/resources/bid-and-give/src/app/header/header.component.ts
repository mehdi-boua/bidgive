import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private service: GlobalService, private route :Router) {}

  @Input() title : string ="";
  @Input() enchere? : string ="";
  @Input() encherir? : string ="";
  @Input() produit? : string ="";
  @Output("fct") fct: EventEmitter<any> = new EventEmitter();


  precedentEncherir(){
    this.route.navigate(["/produit/"+this.service.infoProduit.id_meuble]);
  }
}
