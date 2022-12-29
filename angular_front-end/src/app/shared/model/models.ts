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
}

export class Cliente{
    id: number
    nome: string
    email: string
    endereco: Address
    listaTel: Telefone[]
}