import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAlumnoComponent } from './components/lista-alumno/lista-alumno.component';
import { ListaCursosComponent } from './components/lista-cursos/lista-cursos.component';
import { ListarClasesComponent } from './components/listar-clases/listar-clases.component';

const routes: Routes = [
  { path: 'alumnnos', component: ListaAlumnoComponent },
  { path: 'cursos', component: ListaCursosComponent },
  { path: 'clases', component: ListarClasesComponent },
  { path: '', redirectTo: '/alumnnos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
