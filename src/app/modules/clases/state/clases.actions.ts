import { createAction, props } from '@ngrx/store';
import { IClases } from '../../../shared/interface/clases.interface';

export const cargarClases = createAction('[Clases] Cargar Clases');

export const clasesCargados = createAction(
  '[Clases] Clases Cargadas',
  props<{ clases: IClases[] }>()
);
