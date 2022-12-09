import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs';
import { association } from '../Interfaces/association';
import { catdesc } from '../Interfaces/catdesc';
import { categorie } from '../Interfaces/categorie';
import { user } from '../Interfaces/user';
import { produit, Produit } from '../Interfaces/produit';
import { GlobalService } from '../services/global.service';
import { PageProduitComponent } from '../page-produit/page-produit.component';
import { ProdDesc } from '../Interfaces/prodDesc';

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

    this.association = [];
    this.http.get<association[]>("/api/association/all").subscribe(data => {
      data.forEach(asso=> this.association.push(asso))
    })
    console.log(this.association[0]);
    
    
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
  numCat : number = 0;
  association: association[] = [];

  prod : Produit = new Produit();
  prodDesc: ProdDesc[] = [];

  onSelectedChange(value: string) {
    this.select = value;
    //console.log(this.select);
  }

  verifEtape1(){
    let inp = (document.getElementById('input') as  HTMLInputElement ).value;
    let sel = (document.getElementById('select') as  HTMLSelectElement ).value;

    if(inp != "" && sel != "") {
      this.disabled = false;
      this.prod.designation = inp;
      this.prod.idCategorie = this.numCat;
    } else {
      this.disabled = true;
    }
  } 

  verifEtape2() {
    let inp = (document.getElementById('textareae2') as  HTMLInputElement ).value;
    let sel = (document.getElementById('inpute2') as  HTMLInputElement ).value;

    if(inp != "" && sel != "") {
      this.disabled = false;
      this.prod.description = inp;
      //TODO: import product image
    } else {
      this.disabled = true;
    }
  }

  verifEtape3() {
    if((document.getElementById("check") as HTMLInputElement).checked == true ||  (document.getElementById("check-livraison") as HTMLInputElement).checked == true) {
      this.disabled = false;
      this.prod.idLivrison = (document.getElementById("check-livraison") as HTMLInputElement).checked;
    } else {
      this.disabled = true;
    }
  }

  verifEtape4() {
    if( (document.getElementById('inputdeb') as  HTMLInputElement ).value != ""  && 
    (document.getElementById('seltemps') as  HTMLInputElement ).value  != "") {
      console.log("ici")
      this.disabled = false;

      this.prod.prixDepart = Number((document.getElementById('inputdeb') as  HTMLInputElement ).value);
      this.prod.prixReserve = this.prod.prixDepart;
      
      this.prod.dureeEnchere = Number((document.getElementById('seltemps') as  HTMLInputElement ).value);

      if((document.getElementById('checkres') as  HTMLInputElement ).checked){
        this.prod.prixReserve = Number((document.getElementById('inputres') as  HTMLInputElement ).value);
      }

    } else {
      this.disabled = true;
    }
  }

  verifEtape5() {
    console.log((document.querySelector('input[name=asso]:checked') as HTMLInputElement).value);
    if ((document.querySelector('input[name=asso]:checked') as HTMLInputElement).value != "") {
      this.disabled = false;
      this.prod.idAssociation = Number((document.querySelector('input[name=asso]:checked') as HTMLInputElement).value);
    } else {
      this.disabled = true;
    }
  }


  addReserve() {
    if((document.getElementById("checkres") as HTMLInputElement).checked == true ) {
      (document.getElementById('reserve') as HTMLElement).classList.remove('hide');
       this.disabled = true;
    }
    else{
      (document.getElementById('reserve') as HTMLElement).classList.add('hide');
      this.verifEtape4();
    }
  }

  etapeSuivante() {
    if(!(document.getElementById("etape1") as HTMLElement).classList.contains('hide')) {
      (document.getElementById("etape1") as HTMLElement).classList.add('hide');
      (document.getElementById("etape2") as HTMLElement).classList.remove('hide');
      (document.getElementById("progression") as HTMLElement).classList.remove('progression1');
      (document.getElementById("progression") as HTMLElement).classList.add('progression2');
      
      this.disabled = true;
    } else if(!(document.getElementById("etape2") as HTMLElement).classList.contains('hide')) {
      (document.getElementById("etape2") as HTMLElement).classList.add('hide');
      (document.getElementById("etape3") as HTMLElement).classList.remove('hide');
      (document.getElementById("progression") as HTMLElement).classList.remove('progression1');
      (document.getElementById("progression") as HTMLElement).classList.add('progression2');
      this.disabled = true;
    } else if(!(document.getElementById("etape3") as HTMLElement).classList.contains('hide')) {
      (document.getElementById("etape3") as HTMLElement).classList.add('hide');
      (document.getElementById("etape4") as HTMLElement).classList.remove('hide');
      (document.getElementById("progression") as HTMLElement).classList.remove('progression2');
      (document.getElementById("progression") as HTMLElement).classList.add('progression3');
      this.disabled = true;  
    } else if(!(document.getElementById("etape4") as HTMLElement).classList.contains('hide')) {
      (document.getElementById("etape4") as HTMLElement).classList.add('hide');
      (document.getElementById("etape5") as HTMLElement).classList.remove('hide');
      (document.getElementById("progression") as HTMLElement).classList.remove('progression3');
      (document.getElementById("progression") as HTMLElement).classList.add('progression4');
      this.disabled = true;  
    } else if(!(document.getElementById("etape5") as HTMLElement).classList.contains('hide')) {
      (document.getElementById("etape5") as HTMLElement).classList.add('hide');
      (document.getElementById("etape6") as HTMLElement).classList.remove('hide');
      (document.getElementById("btn1et6") as HTMLElement).classList.remove('hide');
      (document.getElementById("btn2et6") as HTMLElement).classList.remove('hide');
      (document.getElementById("btnetape") as HTMLElement).remove();
      (document.getElementById("footer") as HTMLElement).classList.add('footer-et6');
      (document.getElementById("progression") as HTMLElement).classList.remove('progression4');
      (document.getElementById("progression") as HTMLElement).classList.add('progression5');
    }
  }

  accueil(){
    var statu = 0
    var idPoduit = 0

    this.catdesc.forEach(desc =>{
      var temp = new ProdDesc();
      temp.idCatDesc = desc.id;
      console.log("id cat desc : "+temp.idCatDesc)

      if(desc.options){
        var optionIndex = (document.getElementById("catdesc-"+desc.id) as HTMLSelectElement).selectedIndex;
        temp.option = this.descOpt[desc.id][optionIndex]
      }
      else{
        temp.option = (document.getElementById("catdesc-"+desc.id) as HTMLInputElement).value;
      }

      this.prodDesc.push(temp);
    });

    var lienImage = this.global.lienImagesCrea[Math.floor(Math.random()*3)]

    this.http.post<Produit>("/api/prod/new", {
      "designation": this.prod.designation,
      "description": this.prod.description,
      "idDonateur": this.prod.idDonateur,
      "idCategorie": this.prod.idCategorie,
      "lienImages": lienImage,
      "nomVille": null,
      "prixDepart": this.prod.prixDepart,
      "prixReserve": this.prod.prixReserve,
      "dureeEnchere": this.prod.dureeEnchere,
      "debutEnchere": null,
      "idAssociation": this.prod.idAssociation,
      "idLivrison": this.prod.idLivrison
    }, {observe: 'response'}).subscribe(req => {
      if(req.status == 200){
        statu = 200
        idPoduit = (req.body!).id;
        console.log("id produit = "+idPoduit)

        setTimeout(() => {
          var url = "/api/prod/"+idPoduit+"/desc/new"
          console.log(url)
          
          this.prodDesc.forEach(desc=>{
            desc.idProduit = idPoduit
            console.log(desc)
            console.log(desc.idProduit)
            this.http.post(url, {
              "idProduit": desc.idProduit,
              "idCatDesc": desc.idCatDesc,
              "option": desc.option
            },{observe:'response'}).subscribe(resp =>{
              if(resp.status == 200)
                this.route.navigateByUrl("/home")
            }
            );
          })
    
        }, 500);
      }
    })
  }

  nouvelleEnchere(){
    var statu = 0
    var idPoduit = 0

    this.catdesc.forEach(desc =>{
      var temp = new ProdDesc();
      temp.idCatDesc = desc.id;
      console.log("id cat desc : "+temp.idCatDesc)

      if(desc.options){
        var optionIndex = (document.getElementById("catdesc-"+desc.id) as HTMLSelectElement).selectedIndex;
        temp.option = this.descOpt[desc.id][optionIndex]
      }
      else{
        temp.option = (document.getElementById("catdesc-"+desc.id) as HTMLInputElement).value;
      }

      this.prodDesc.push(temp);
    });    

    var lienImage = this.global.lienImagesCrea[Math.floor(Math.random()*3)]

    this.http.post<Produit>("/api/prod/new", {
      "designation": this.prod.designation,
      "description": this.prod.description,
      "idDonateur": this.prod.idDonateur,
      "idCategorie": this.prod.idCategorie,
      "lienImages": lienImage,
      "nomVille": null,
      "prixDepart": this.prod.prixDepart,
      "prixReserve": this.prod.prixReserve,
      "dureeEnchere": this.prod.dureeEnchere,
      "debutEnchere": null,
      "idAssociation": this.prod.idAssociation,
      "idLivrison": this.prod.idLivrison
    }, {observe: 'response'}).subscribe(req => {
      if(req.status == 200){
        statu = 200
        idPoduit = (req.body!).id;
        console.log("id produit = "+idPoduit)

        setTimeout(() => {
          var url = "/api/prod/"+idPoduit+"/desc/new"
          console.log(url)
          
          this.prodDesc.forEach(desc=>{
            desc.idProduit = idPoduit
            console.log(desc)
            console.log(desc.idProduit)
            this.http.post(url, {
              "idProduit": desc.idProduit,
              "idCatDesc": desc.idCatDesc,
              "option": desc.option
            },{observe:'response'}).subscribe(resp =>{
              if(resp.status == 200)
                this.route.navigateByUrl("/home")
            }
            );
          })
    
        }, 500);
      }
    })
  }

  getcatdesc(idCat: number){
    this.numCat = idCat;
    this.catdesc = [];
    this.http.get<catdesc[]>("/api/cat/"+idCat+"/desc",  {observe:'response'})
    .subscribe(data =>{
      data.body?.forEach((elem) => {
        this.catdesc.push(elem);
        this.http.get<string[]>("/api/cat/"+idCat+"/"+elem.id+"/opt").subscribe(opt => {
          this.descOpt[elem.id] = opt;
        })
      })
    })

    this.verifEtape1();
  }

}
