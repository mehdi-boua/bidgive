import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../Interfaces/user';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-page-compte',
  templateUrl: './page-compte.component.html',
  styleUrls: ['./page-compte.component.scss']
})
export class PageCompteComponent implements OnInit {
  
  constructor(private service: GlobalService,@Inject(Router) private route : Router, private http: HttpClient) {}
  
  ngOnInit(): void {
    
    if(this.service.user.length == 0 || this.service.user[0].nom =="") {
      this.http.get<user>("/api/user/get",{observe:'response'}).subscribe(data => {
        if (data.body == null) {
          this.route.navigate(["/connexion"]);
        }else{
          this.service.user.push(data.body)
          console.log(this.service.user)
        }
      })
    }

  }

  user = this.service.user;

  toggleMore(e : Event) {
    let evt = e.currentTarget as HTMLInputElement;
    evt.querySelector("div")?.classList.toggle("hide");
  }

  disconnect(){
    this.http.get("/api/user/logout").subscribe();
    this.service.user = [];
    this.route.navigateByUrl('/home');
  }
}
