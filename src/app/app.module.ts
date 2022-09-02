import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './core/service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AlumnosModule } from './modules/alumnos/alumnos.module';
import { ClasesModule } from './modules/clases/clases.module';
import { CursosModule } from './modules/cursos/cursos.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent, MenuLateralComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    SharedModule,
    HttpClientModule,
    AlumnosModule,
    ClasesModule,
    CursosModule,
    AuthModule,
  ],
  // entryComponents: [AbmAlumnoComponent],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
