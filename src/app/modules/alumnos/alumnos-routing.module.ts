import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAlumnoComponent } from './components/lista-alumno/lista-alumno.component';

const routes: Routes = [
  {
    path: 'listar',
    component: ListaAlumnoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnosRoutingModule {}
