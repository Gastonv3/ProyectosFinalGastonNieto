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
import { NombreCompletoPipe } from './shared/pipe/nombre-completo.pipe';
import { Size20Directive } from './shared/directive/size20.directive';
import { MenuComponent } from './components/menu/menu.component';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    ListaAlumnoComponent,
    AbmAlumnoComponent,
    NombreCompletoPipe,
    Size20Directive,
    MenuComponent,
    MenuLateralComponent,
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
  ],
  entryComponents: [AbmAlumnoComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
