import { Component, OnInit } from '@angular/core';
// import { ListaAlumnoService } from '../../service/lista-alumno/lista-alumno.service';
import { MatDialog } from '@angular/material/dialog';
import { AbmAlumnoComponent } from '../abm-alumno/abm-alumno.component';

import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ListaAlumnoService } from 'src/app/core/service/lista-alumno/lista-alumno.service';
import { IAbmDialog } from 'src/app/shared/interface/AbmDialog.interface';
import { IAlumno } from 'src/app/shared/interface/alumno.interface';
import { ListaCursosService } from '../../../../core/service/lista-cursos/lista-cursos.service';

@Component({
  selector: 'app-lista-alumno',
  templateUrl: './lista-alumno.component.html',
  styleUrls: ['./lista-alumno.component.css'],
})
export class ListaAlumnoComponent implements OnInit {
  displayedColumns: string[] = [
    'Legajo',
    'Alumno',
    'Curso',
    'Nota',
    'Acciones',
  ];
  dataSource!: MatTableDataSource<any>;
  public subcriptionCursos: Subscription = new Subscription();

  constructor(
    public service: ListaAlumnoService,
    private dialog: MatDialog,
    public serviceCurso: ListaCursosService
  ) {}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  public cargarAlumnos() {
    this.subcriptionCursos = this.service.listaAlumnos().subscribe((result) => {
      this.service.listado = result;

      this.serviceCurso.listarCursos().subscribe((cursos) => {
        for (const iterator of this.service.listado) {
          const itemClase = cursos.filter((item) => {
            return item.id == iterator.Curso;
          });
          iterator.CursoNombre = itemClase[0].Nombre;
        }
      });

      this.dataSource = new MatTableDataSource(this.service.listado);
    });
  }

  abrirModal() {
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
      this.service.cargarAlumno(result.alumno!).subscribe((alumno) => {
        this.ngOnInit();
      });
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
      // this.service.AbmAlumno(result);
      this.service.modificarAlumno(result.alumno!).subscribe((alumno) => {
        this.ngOnInit();
      });
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
      this.ngOnInit();
    });
    // this.service.AbmAlumno(sendData);
    // this.cargarAlumnos();
  }
}
