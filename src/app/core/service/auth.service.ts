import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISesion } from '../../shared/interface/sesion.interface';
import { IUsuario } from '../../shared/interface/usuario.interface';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { SesionState } from '../../auth/sesion/state/sesion.reducer';
import { cargarSesion } from 'src/app/auth/sesion/state/sesion.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _sesionSubject!: BehaviorSubject<ISesion>;
  private api: string = environment.url;
  private usuarios: IUsuario[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<SesionState>
  ) {
    const sesion: ISesion = {
      estado: false,
    };
    this._sesionSubject = new BehaviorSubject(sesion);
  }

  public logInApi() {
    return this.http.get(`${this.api}/usuarios`);
  }
  public logIn(usr: IUsuario) {
    this.http
      .get<IUsuario[]>(`${this.api}/usuarios`)
      .pipe(
        map((usuarios: IUsuario[]) => {
          return usuarios.filter(
            (u) => u.user === usr.user && u.pass === usr.pass
          )[0];
        })
      )
      .subscribe((usuario: IUsuario) => {
        if (usuario) {
          const sesion: ISesion = {
            estado: true,
            usuario: {
              nombre: usuario.nombre,
              apellido: usuario.apellido,
              user: usuario.user,
              pass: usuario.pass,
              id_perfil: usuario.id_perfil,
              id: usuario.id,
            },
          };
          this._sesionSubject.next(sesion);
          this.store.dispatch(cargarSesion({ usuarioActivo: usuario }));
          this.router.navigate(['/alumnos/listar']);
        } else {
          alert('Usario no encontrado');
        }
      });
  }

  public logOut() {
    const sesion: ISesion = {
      estado: false,
    };
    this._sesionSubject.next(sesion);
  }

  public logEstatus() {
    return this._sesionSubject.asObservable();
  }
}
