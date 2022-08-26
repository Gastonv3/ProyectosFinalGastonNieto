import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListaAlumnoComponent } from './components/lista-alumno/lista-alumno.component';

import { MatTableModule } from '@angular/material/table';
import { AbmAlumnoComponent } from './components/abm-alumno/abm-alumno.component';
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
import { ListaCursosComponent } from './components/lista-cursos/lista-cursos.component';
import { AbmCursoComponent } from './components/abm-curso/abm-curso.component';
import { ListarClasesComponent } from './components/listar-clases/listar-clases.component';
import { AbmClaseComponent } from './components/abm-clase/abm-clase.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaAlumnoComponent,
    AbmAlumnoComponent,
    MenuLateralComponent,
    ListaCursosComponent,
    AbmCursoComponent,
    ListarClasesComponent,
    AbmClaseComponent,
  ],
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
  ],
  entryComponents: [AbmAlumnoComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
