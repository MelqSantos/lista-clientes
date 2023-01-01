import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cep, Cliente } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http : HttpClient) { }

  url = environment.urlApi;
  viaCepUrl = 'https://viacep.com.br/ws'

  getAll():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.url}/clients`)
  }

  getAddress(cep: string): Observable<Cep>{
    return this.http.get<Cep>(`${this.viaCepUrl}/${cep}/json`)
  }

  getByEmail(email: string): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.url}/clients/email/${email}`)
  }

  getById(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.url}/clients/${id}`)
  }

  create(cliente: Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(`${this.url}/clients`, cliente)
  }

  update(id: number, cliente: Cliente):Observable<Cliente>{
    return this.http.patch<Cliente>(`${this.url}/clients/${id}`, cliente)
  }

  delete(id: number) : Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.url}/clients/${id}`)
  }



}
