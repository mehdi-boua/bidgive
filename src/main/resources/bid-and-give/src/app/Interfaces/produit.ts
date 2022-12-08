export interface produit{
  id : number
  designation: string
  description: string
  idDonateur : number
  idCategorie : number
  lienImages : string
  nomVille : string 
  prixDepart : number
  prixReserve : number
  dureeEnchere : number
  debutEnchere :Date
  idAssociation : number
  idLivrison : boolean

}

export class Produit implements produit{
  id: number = 0
  designation: string = ""
  description: string = ""
  idDonateur: number = 0
  idCategorie: number = 0
  lienImages: string = ""
  nomVille: string = ""
  prixDepart: number = 0
  prixReserve: number = 0
  dureeEnchere: number = 0
  debutEnchere: Date = new Date();
  idAssociation: number = 0
  idLivrison: boolean = false;
  
}