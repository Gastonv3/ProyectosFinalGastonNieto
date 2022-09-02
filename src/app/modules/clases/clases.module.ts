import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasesRoutingModule } from './clases-routing.module';
import { AbmClaseComponent } from './components/abm-clase/abm-clase.component';
import { ListarClasesComponent } from './components/listar-clases/listar-clases.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ListarClasesComponent, AbmClaseComponent],
  imports: [CommonModule, ClasesRoutingModule, SharedModule],
})
export class ClasesModule {}
