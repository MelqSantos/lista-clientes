import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

const routes: Routes = [
  {path: '', redirectTo: 'clientes', pathMatch: 'full'},
  {path: 'clientes', component: ClientesComponent},
  {path: 'cadastrar', component: CadastrarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
