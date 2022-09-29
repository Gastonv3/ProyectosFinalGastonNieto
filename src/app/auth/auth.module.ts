import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromSesion from './sesion/state/sesion.reducer';
// import { EffectsModule } from '@ngrx/effects';
// import { SesionEffects } from './sesion/state/sesion.effects';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    StoreModule.forFeature(fromSesion.sesionFeatureKey, fromSesion.reducer),
    // EffectsModule.forFeature([SesionEffects]),
  ],
  exports: [LoginComponent],
})
export class AuthModule {}
