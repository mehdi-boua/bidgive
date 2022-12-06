import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs';
import { catdesc } from '../Interfaces/catdesc';
import { categorie } from '../Interfaces/categorie';
import { user } from '../Interfaces/user';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-page-creation',
  templateUrl: './page-creation.component.html',
  styleUrls: ['./page-creation.component.scss']
})
export class PageCreationComponent implements OnInit {
  
  constructor( private global : GlobalService,@Inject(Router) private route: Router, private http :HttpClient) {
  }

  ngOnInit(): void {
    this.categories = []
    this.http.get<categorie[]>("/api/cat/all").subscribe(data =>{
      console.log(data);
      data.forEach(element => this.categories.push(element));
    })
    
    
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
  }


  descOpt: string[][] = []
  catdesc: catdesc[] = []
  title : string ="";
  select : string = "";
  selectTaille : string = "";
  categories: categorie[] = this.global.categories;
  tailles: string[] = this.global.tailles;
  disabled : boolean = true;


  onSelectedChange(value: string) {
    this.select = value;
    //console.log(this.select);
  }

  verifEtape1(a: any,b: any){
    console.log(a);
    console.log(b);
    if(a != "" && b!= "") {
      this.disabled = false;
    }
  }

  getcatdesc(idCat: number){
    console.log("pizza")
    this.http.get<catdesc[]>("/api/cat/"+idCat+"/desc",  {observe:'response'})
    .subscribe(data =>{
      data.body?.forEach((elem) => {
        this.catdesc.push(elem);
        this.http.get<string[]>("/api/cat/"+idCat+"/"+elem.id+"/opt").subscribe(opt => {
          this.descOpt[elem.id] = opt;
        })
      })
    })
  }

}
