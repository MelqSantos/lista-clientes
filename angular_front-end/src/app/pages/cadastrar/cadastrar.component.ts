import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Cliente, Telefone, Address, Cep } from 'src/app/shared/model/models';
import { ClienteService } from 'src/app/shared/services/cliente.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: ClienteService) { }

  ngOnInit(): void {
  }

  cliente: Cliente = new Cliente();
  address: Address = new Address();
  cep: Cep = new Cep();
  telList: Telefone[] = [];

  clientForm = this.fb.group({
    nome: [null, Validators.required],
    email: [null, Validators.required],
    telPr: [null, Validators.required],
    telSec: null,
    cep: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(9)])
    ],
    address: [null, Validators.required],
    complemento: null,
    bairro: [null, Validators.required],
    cidade: [null, Validators.required],
  });

  onSubmit(): void {

    this.convertForm()
    console.log(this.cliente)
    this.service.create(this.cliente).subscribe((resp: Cliente) => {
      this.cliente = resp;

      alert('Usuário cadastrado!')
    }, 
    error => {
      if (error.status == 400) {
        alert('Favor verificar os campos')
        console.log(error)
      }
    });
  }

  convertForm(){
    let form = this.clientForm.value;

    this.telList.push(new Telefone(form.telPr));
    this.telList.push(new Telefone(form.telSec));

    this.address.cep = form.cep;
    this.address.endereco = form.address;
    this.address.complemento = form.complemento;
    this.address.bairro = form.bairro
    this.address.cidade = form.cidade;

    this.cliente.nome = form.nome;
    this.cliente.email = form.email;
    this.cliente.endereco = this.address;
    this.cliente.listaTel = this.telList;
  }

  public buscaCep(cep: string){
    this.service.getAddress(cep).subscribe((resp: Cep) => {
      this.cep = resp;
      this.setAddress(resp);
    }, 
    error => {
      if (error.status == 503) {
        alert('Serviço indisponível')
        console.log(error)
      }
    });
  }

  public setAddress(cep : Cep){
   this.clientForm.patchValue(
    {
      cep : cep.cep,
      bairro: cep.bairro,
      address: cep.logradouro,
      cidade: cep.localidade,
      complemento: cep.complemento
     }
   )   
  }



}
