import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http : HttpClient) { }

  url = environment.urlApi;

  getAll():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.url}/clients`)
  }

  create(cliente: Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(`${this.url}/clients`, cliente)
  }


}
