import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISesion } from '../../shared/interface/sesion.interface';
import { IUsuario } from '../../shared/interface/usuario.interface';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _sesionSubject!: BehaviorSubject<ISesion>;
  private api: string = environment.url;

  constructor(private http: HttpClient, private router: Router) {
    const sesion: ISesion = {
      estado: false,
    };
    this._sesionSubject = new BehaviorSubject(sesion);
  }

  public logIn(usr: IUsuario) {
    console.log(usr);
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
          this.router.navigate(['/alumnos/listar']);
        } else {
          alert('Usario no encontrado');
        }
      });
  }

  // iniciarSesion(usuario: Usuario) {
  //   this.http
  //     .get<Usuario[]>(`${this.api}/usuarios`)
  //     .pipe(
  //       map((usuarios: Usuario[]) => {
  //         return usuarios.filter(
  //           (u: Usuario) =>
  //             u.usuario === usuario.usuario &&
  //             u.contrasena === usuario.contrasena
  //         )[0];
  //       })
  //     )
  //     .pipe(catchError(this.manejarError))
  //     .subscribe((usuario: Usuario) => {
  //       if (usuario) {
  //         const sesion: Sesion = {
  //           sesionActiva: true,
  //           usuario: {
  //             id: usuario.id,
  //             usuario: usuario.usuario,
  //             contrasena: usuario.contrasena,
  //             admin: usuario.admin,
  //           },
  //         };

  //         this.sesionSubject.next(sesion);

  //         this.router.navigate(['inicio']);
  //       } else {
  //         alert('Usario no encontrado');
  //       }
  //     });
  // }
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
