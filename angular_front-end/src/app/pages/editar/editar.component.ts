import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address, Cliente, Telefone } from 'src/app/shared/model/models';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: ClienteService,
    private toastr: NotificationService,
    private router: ActivatedRoute,
    private route: Router
  ) { }

  idUser = this.router.snapshot.params['id'];
  cliente: Cliente = new Cliente();
  address: Address = new Address();
  telList: Telefone[] = [];
  isActive : boolean;

  ngOnInit(): void {
    window.scroll(0,0)
    this.getById(this.idUser);
  }

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
    active: [null, Validators.required]
  });

  public getById(id: number){
    this.service.getById(id).subscribe((resp: Cliente) => {
      this.cliente = resp;
      console.log(this.cliente)
      this.isActive = resp.active
      this.setFields()

      
    },
      error => {
        if (error.status == 503) {
          alert('Serviço indisponível')
          console.log(error)
        }
      });
  }

  onSubmit(): void {

    this.convertForm()
    this.service.update(this.idUser, this.cliente).subscribe((resp: Cliente) => {
      this.cliente = resp;

      this.toastr.showSuccess('Usuário editado!', 'Sucesso')
      this.route.navigateByUrl("/clientes")
    }, 
    error => {
      if (error.status == 400) {
        this.toastr.showError('Favor verificar os campos', `Erro ${error.status}`)
        console.log(error)
      } else
       if (error.status == 503){
        this.toastr.showError('Servidor indisponível', `Erro ${error.status}`)
       }
    });
  }

  public setFields(){
    this.clientForm.patchValue(
      {
      nome: this.cliente.nome,
      email: this.cliente.email,
      cep: this.cliente.endereco.cep,
      address: this.cliente.endereco.endereco,
      complemento: this.cliente.endereco.complemento,
      bairro: this.cliente.endereco.bairro,
      cidade: this.cliente.endereco.cidade,
      active: this.cliente.active
       })

       if(this.cliente.listaTel.length > 1){
        this.clientForm.patchValue({
          telPr: this.cliente.listaTel[0].telefone, 
          telSec: this.cliente.listaTel[1].telefone
        });
       }
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
    this.cliente.active = form.active == 'true' ? true : false;
  }

}
