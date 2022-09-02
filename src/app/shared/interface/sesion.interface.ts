import { IUsuario } from './usuario.interface';
export interface ISesion {
  estado: boolean;
  usuario?: IUsuario;
}
