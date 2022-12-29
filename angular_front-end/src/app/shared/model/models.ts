export class Address{
    cep: string
    endereco: string
    bairro: string
    complemento: string
    cidade: string
}

export class Telefone{
    id : number
    id_cliente: number
    telefone: string

    constructor(telefone: string) {
        this.telefone = telefone;
      }
}

export class Cliente{
    id: number
    nome: string
    email: string
    endereco: Address
    listaTel: Telefone[]
    isActive: boolean
}