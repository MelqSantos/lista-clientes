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
    active: boolean
    endereco: Address
    listaTel: Telefone[]
}

export class Cep    {
    cep: string
    logradouro: string 
    complemento: string
    bairro: string
    localidade: string 
    uf: string
  }