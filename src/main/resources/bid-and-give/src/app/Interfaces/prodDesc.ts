export interface prodDesc{
    idProduit: number
    idCatDesc: number
    option: string
}

export interface prodDesc2{
    desc: string
    option: string
}

export class ProdDesc implements prodDesc{
    idProduit: number = 0
    idCatDesc: number = 0
    option: string = ""

}