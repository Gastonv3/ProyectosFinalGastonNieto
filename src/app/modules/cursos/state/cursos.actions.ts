import { createAction, props } from '@ngrx/store';
import { ICurso } from 'src/app/shared/interface/cursos.interface';

export const cargarCursos = createAction('[Cursos] Cargar Cursos');

export const cursosCargados = createAction(
  '[Cursos] Cursos Cargados',
  props<{ cursos: ICurso[] }>()
);
