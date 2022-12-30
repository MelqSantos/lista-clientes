import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { Cep, Cliente } from 'src/app/shared/model/models';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  constructor(
    private service: ClienteService
  ) { 
    this.dataSource = new MatTableDataSource<Cliente>(this.clientList);
  }

  ngOnInit(): void {
    this.getAll();
  }

  clientList : Cliente[] = [];
  cep : Cep = new Cep();

  public pesquisar(){

  }

  public getAll(){
    this.service.getAll().subscribe((resp: Cliente[]) => {
      this.clientList = resp;
      this.dataSource.data = resp
    }, 
    error => {
      if (error.status == 503) {
        alert('Serviço indisponível')
        console.log(error)
      }
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  columns = [
    {
      columnDef: 'id',
      header: 'ID.',
      cell: (element: Cliente) => `${element.id}`,
    },
    {
      columnDef: 'nome',
      header: 'Nome',
      cell: (element: Cliente) => `${element.nome}`,
    },
    {
      columnDef: 'tel',
      header: 'Telefone',
      cell: (element: Cliente) => `${element.listaTel[0].telefone}`,
    },
    {
      columnDef: 'email',
      header: 'E-mail',
      cell: (element: Cliente) => `${element.email}`,
    },
    {
      columnDef: 'address',
      header: 'Endereço',
      cell: (element: Cliente) => `${element.endereco.cidade}`,
    },
    {
      columnDef: 'status',
      header: 'Situação',
      cell: (element: Cliente) => `${element.active}`,
    },
    {
      columnDef: 'buttons',
      header: 'Ações',
      cell: (element: Cliente) => `Botões`,
    },
  ];
  dataSource : MatTableDataSource<Cliente>;
  displayedColumns = this.columns.map(c => c.columnDef);

}
