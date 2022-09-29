import { createAction, props } from '@ngrx/store';
import { IUsuario } from 'src/app/shared/interface/usuario.interface';

export const cargarSesion = createAction(
  '[Sesion] Cargar Sesion',
  props<{ usuarioActivo: IUsuario }>()
);
