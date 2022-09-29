import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { AbmCursoComponent } from './components/abm-curso/abm-curso.component';
import { ListaCursosComponent } from './components/lista-cursos/lista-cursos.component';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromCursos from './state/cursos.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CursosEffects } from './state/cursos.effects';

@NgModule({
  declarations: [ListaCursosComponent, AbmCursoComponent],
  imports: [
    CommonModule,
    CursosRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromCursos.cursosFeatureKey, fromCursos.reducer),
    EffectsModule.forFeature([CursosEffects]),
  ],
})
export class CursosModule {}
