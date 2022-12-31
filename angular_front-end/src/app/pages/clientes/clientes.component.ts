import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { Address, Cep, Cliente } from 'src/app/shared/model/models';
import { NotificationService } from 'src/app/shared/services/notification.service';

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
    private service: ClienteService,
    private toastr: NotificationService,
  ) {
    this.dataSource = new MatTableDataSource<Cliente>(this.clientList);
  }

  ngOnInit(): void {
    this.getAll();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['id', 'nome', 'telefone', 'email', 'endereco', 'status', 'acoes'];
  dataSource: MatTableDataSource<Cliente>;

  clientList: Cliente[] = [];
  cliModal: Cliente = new Cliente();
  address: Address = new Address();
  cep: Cep = new Cep();
  totalCli = 0;
  totalActive = 0;
  totalInactive = 0;

  public pesquisar(email: string) {
    this.service.getByEmail(email).subscribe((resp: Cliente[]) => {
      this.clientList = resp;
      this.dataSource.data = resp;
    },
      error => {
        if (error.status == 404) {
          this.toastr.showWarning('Nenhum registro encontrado', 'Aviso')
          console.log(error)
        }
      });
  }

  public getAll() {
    this.service.getAll().subscribe((resp: Cliente[]) => {
      this.clientList = resp;
      this.dataSource.data = resp;
      this.dashboard();
    },
      error => {
        if (error.status == 503) {
          alert('Serviço indisponível')
          console.log(error)
        }
      });
  }

  public getById(id: number){
    this.service.getById(id).subscribe((resp: Cliente) => {
      this.cliModal = resp;
      this.address = resp.endereco;
    },
      error => {
        if (error.status == 503) {
          alert('Serviço indisponível')
          console.log(error)
        }
      });
  }

  public dashboard() {
    this.clientList.forEach(el => {

      if (el.active) {
        this.totalActive += 1;

      } else {
        this.totalInactive += 1;
      }
      this.totalCli += 1;
    });
  }

}
