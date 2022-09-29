import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SesionState } from '../../auth/sesion/state/sesion.reducer';
import { Observable } from 'rxjs/internal/Observable';
import { IUsuario } from '../../shared/interface/usuario.interface';
import { selectUsuarioActivaState } from 'src/app/auth/sesion/state/sesion.selectors';
import { selectSessionActivaState } from '../../auth/sesion/state/sesion.selectors';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css'],
})
export class MenuLateralComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  fillerNav = [
    { name: 'Alumnos', route: 'alumnos/listar' },
    { name: 'Cursos', route: 'cursos/listar' },
    { name: 'Clases', route: 'clases/listar' },
  ];

  private _mobileQueryListener: () => void;
  public usuarioActivo$!: Observable<IUsuario | undefined>;
  public sessionActiva$!: Observable<boolean | undefined>;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private store: Store<SesionState>
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.usuarioActivo$ = this.store.select(selectUsuarioActivaState);
    this.sessionActiva$ = this.store.select(selectSessionActivaState);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  public cerrarSesion() {
    this.router.navigate(['login']);
  }
}
