import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { ListaCursosComponent } from './modules/cursos/components/lista-cursos/lista-cursos.component';
import { ListarClasesComponent } from './modules/clases/components/listar-clases/listar-clases.component';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MenuLateralComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'alumnos',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/alumnos/alumnos-routing.module').then(
            (m) => m.AlumnosRoutingModule
          ),
      },

      {
        path: 'clases',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/clases/clases-routing.module').then(
            (m) => m.ClasesRoutingModule
          ),
      },
      {
        path: 'cursos',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/cursos/cursos-routing.module').then(
            (m) => m.CursosRoutingModule
          ),
      },
      { path: '', redirectTo: 'alumnos/listar', pathMatch: 'full' },
    ],
  },

  // { path: '', redirectTo: '/alumnnos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
