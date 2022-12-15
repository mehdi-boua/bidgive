import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { GlobalService } from '../services/global.service';
import data  from '../../assets/data.json';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map: any;

  constructor(private service: GlobalService) { 
  }


  ville = this.service.infoProduit.nomVille.toLowerCase();
  data = data;

  getCoord() {
    return this.data.filter(item => {
      if(item.ville.toLowerCase().includes(this.ville)) {
        return item.coordinates[0];
      } else {
        return;
      }
    })
  }


  initMap() {
    const coordonnees = this.getCoord();
    console.log(coordonnees);
    this.map = L.map('map', {
      center: [ 46.227638,2.213749 ],
      zoom: 6
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    
   L.marker([coordonnees[0].coordinates[0],coordonnees[0].coordinates[1]]).addTo(this.map);

  }

  ngAfterViewInit() {
    this.initMap();
    //console.log("coorddonnees"+this.coordonnees[0], this.coordonnees[1]);
  }
}
