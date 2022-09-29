import { Component, OnInit } from '@angular/core';
// import { ListaAlumnoService } from '../../service/lista-alumno/lista-alumno.service';
import { MatDialog } from '@angular/material/dialog';
import { AbmAlumnoComponent } from '../abm-alumno/abm-alumno.component';

import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { ListaAlumnoService } from 'src/app/core/service/lista-alumno/lista-alumno.service';
import { IAbmDialog } from 'src/app/shared/interface/AbmDialog.interface';
import { IAlumno } from 'src/app/shared/interface/alumno.interface';
import { ListaCursosService } from '../../../../core/service/lista-cursos/lista-cursos.service';
import { Store } from '@ngrx/store';
import { AlumnosState } from '../../state/alumnos.reducer';
import { cargarAlumnos } from '../../state/alumnos.actions';
import {
  selectAlumnosCargandosState,
  selectCargandoState,
} from '../../state/alumnos.selectors';
import { ICurso } from '../../../../shared/interface/cursos.interface';

@Component({
  selector: 'app-lista-alumno',
  templateUrl: './lista-alumno.component.html',
  styleUrls: ['./lista-alumno.component.css'],
})
export class ListaAlumnoComponent implements OnInit {
  public listado: IAlumno[] = [];
  public listadoCursos: ICurso[] = [];

  public displayedColumns: string[] = [
    'Legajo',
    'Alumno',
    'Curso',
    'Nota',
    'Acciones',
  ];
  public dataSource!: MatTableDataSource<any>;
  public cargando$!: Observable<boolean>;

  constructor(
    public service: ListaAlumnoService,
    private dialog: MatDialog,
    public serviceCurso: ListaCursosService,
    public store: Store<AlumnosState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(cargarAlumnos());
    this.store.select(selectAlumnosCargandosState).subscribe((alumnos) => {
      this.listado = alumnos!;
      this.dataSource = new MatTableDataSource(this.listado);
    });
    this.cargando$ = this.store.select(selectCargandoState);
  }

  public abrirModal() {
    let sendData: IAbmDialog = {
      operacionCod: 1,
      operacionDesc: 'Nuevo Alumno',
      alumno: {
        id: 0,
        Nombre: '',
        Apellido: '',
        Curso: 0,
        Nota: 0,
      },
      post: 0,
    };
    const dialogRef = this.dialog.open(AbmAlumnoComponent, {
      width: '500px',

      data: sendData,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.service.cargarAlumno(result.alumno!).subscribe((alumno) => {
          this.store.dispatch(cargarAlumnos());
          this.store
            .select(selectAlumnosCargandosState)
            .subscribe((alumnos) => {
              this.listado = alumnos!;
              this.dataSource = new MatTableDataSource(this.listado);
            });
        });
        this.cargando$ = this.store.select(selectCargandoState);
      }
    });
  }

  public buscarAlumno(i: number, item: IAlumno) {
    let sendData: IAbmDialog = {
      operacionCod: 3,
      operacionDesc: 'Consultar Alumno',
      alumno: {
        id: item.id,
        Nombre: item.Nombre,
        Apellido: item.Apellido,
        Curso: item.Curso,
        Nota: item.Nota,
      },
      post: i,
    };
    const dialogRef = this.dialog.open(AbmAlumnoComponent, {
      width: '500px',

      data: sendData,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  public modificarAlumno(i: number, item: IAlumno) {
    let sendData: IAbmDialog = {
      operacionCod: 2,
      operacionDesc: 'Modificar Alumno',
      alumno: {
        id: item.id,
        Nombre: item.Nombre,
        Apellido: item.Apellido,
        Curso: item.Curso,
        Nota: item.Nota,
      },
      post: i,
    };
    const dialogRef = this.dialog.open(AbmAlumnoComponent, {
      width: '500px',

      data: sendData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.modificarAlumno(result.alumno!).subscribe((alumno) => {
          this.store.dispatch(cargarAlumnos());
          this.store
            .select(selectAlumnosCargandosState)
            .subscribe((alumnos) => {
              this.listado = alumnos!;
              this.dataSource = new MatTableDataSource(this.listado);
            });
        });
        this.cargando$ = this.store.select(selectCargandoState);
      }
    });
  }

  public eliminarAlumno(i: number, item: IAlumno) {
    let sendData: IAbmDialog = {
      operacionCod: 4,
      operacionDesc: 'Eliminar Alumno',
      alumno: {
        id: item.id,
        Nombre: item.Nombre,
        Apellido: item.Apellido,
        Curso: item.Curso,
        Nota: item.Nota,
      },
      post: i,
    };
    this.service.eliminarAlumno(sendData.alumno!).subscribe((alumno) => {
      this.store.dispatch(cargarAlumnos());
      this.store.select(selectAlumnosCargandosState).subscribe((alumnos) => {
        this.listado = alumnos!;
        this.dataSource = new MatTableDataSource(this.listado);
      });
      this.cargando$ = this.store.select(selectCargandoState);
    });
  }
}
