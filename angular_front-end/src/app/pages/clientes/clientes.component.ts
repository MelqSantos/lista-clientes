import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
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

  displayedColumns: string[] = ['id', 'nome', 'telefone', 'email', 'endereco', 'status', 'acoes'];
  dataSource: MatTableDataSource<Cliente>;

  clientList : Cliente[] = [];
  cep : Cep = new Cep();

  public pesquisar(){

  }

  public getAll(){
    this.service.getAll().subscribe((resp: Cliente[]) => {
      this.clientList = resp;
      this.dataSource.data = resp; 
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

}
