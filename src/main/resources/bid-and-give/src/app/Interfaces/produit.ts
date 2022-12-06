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
  categorie : string

}