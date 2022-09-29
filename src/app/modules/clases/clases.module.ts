import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasesRoutingModule } from './clases-routing.module';
import { AbmClaseComponent } from './components/abm-clase/abm-clase.component';
import { ListarClasesComponent } from './components/listar-clases/listar-clases.component';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromClases from './state/clases.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ClasesEffects } from './state/clases.effects';

@NgModule({
  declarations: [ListarClasesComponent, AbmClaseComponent],
  imports: [CommonModule, ClasesRoutingModule, SharedModule, StoreModule.forFeature(fromClases.clasesFeatureKey, fromClases.reducer), EffectsModule.forFeature([ClasesEffects])],
})
export class ClasesModule {}
