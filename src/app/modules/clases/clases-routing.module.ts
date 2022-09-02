import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarClasesComponent } from './components/listar-clases/listar-clases.component';

const routes: Routes = [{ path: 'listar', component: ListarClasesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasesRoutingModule {}
