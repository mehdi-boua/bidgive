export interface fiche{
    id: number,
    designation: string,
    description: string,
    idCategorie: number,
    lienImages: string,
    nomVille: string,
    prixDepart: number,
    prixReserve: number,
    dureeEnchere: number,
    debutEnchere: Date,
    idAssociation: number,
    idLivrison: boolean,
    idDonateur: number,
    donateurPseudo: string,
    meilleurEnchere: number,
    nomMeilleurEncherisseur: string,
    nbDonations: number,
    nbParticipants: number
}

export class Fiche implements fiche{
    id: number = 0
    designation: string = ""
    description: string = ""
    idCategorie: number = 0
    lienImages: string = ""
    nomVille: string = ""
    prixDepart: number = 0
    prixReserve: number = 0
    dureeEnchere: number = 0
    debutEnchere: Date = new Date()
    idAssociation: number = 0
    idLivrison: boolean = false
    idDonateur: number = 0
    donateurPseudo: string = ""
    meilleurEnchere: number = 0
    nomMeilleurEncherisseur: string = ""
    nbDonations: number = 0
    nbParticipants: number = 0
}