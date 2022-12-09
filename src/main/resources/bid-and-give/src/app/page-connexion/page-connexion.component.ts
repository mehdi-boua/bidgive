import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, ɵɵresolveBody } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-page-connexion',
  templateUrl: './page-connexion.component.html',
  styleUrls: ['./page-connexion.component.scss']
})

export class PageConnexionComponent {
  constructor(private http : HttpClient, @Inject(Router) private route: Router) {}
  
  @Input() mail : string = "";
  @Input() password : string = "";

  connexion()  {
    console.log(this.mail);
    console.log(this.password);
    this.http.post('/api/user/auth', {mail : this.mail, password : this.password}, {observe:'response'}).subscribe(
      (data) => {
        console.log(data.status);
        if(data.status == 200) {
            this.route.navigate(['/mon-compte']);
        }
      }
    );
  }

}
