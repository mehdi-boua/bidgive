import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';


@Component({
  selector: 'app-page-produit',
  templateUrl: './page-produit.component.html',
  styleUrls: ['./page-produit.component.scss']
})
export class PageProduitComponent implements OnInit{
  constructor(private service : GlobalService) {}
  ngOnInit(): void {
  }

  elemProduit? = this.service.infoProduit;

}
