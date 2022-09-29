import { createAction, props } from '@ngrx/store';
import { IAlumno } from 'src/app/shared/interface/alumno.interface';

export const cargarAlumnos = createAction('[Alumnos] Cargar Alumnos');

export const alumnosCargados = createAction(
  '[Alumnos] Alumnos Cargados',
  props<{ alumnos: IAlumno[] }>()
);
