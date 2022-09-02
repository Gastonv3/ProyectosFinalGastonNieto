import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { AbmCursoComponent } from './components/abm-curso/abm-curso.component';
import { ListaCursosComponent } from './components/lista-cursos/lista-cursos.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ListaCursosComponent, AbmCursoComponent],
  imports: [CommonModule, CursosRoutingModule, SharedModule],
})
export class CursosModule {}
