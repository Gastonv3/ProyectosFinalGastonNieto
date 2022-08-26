import { Component, OnInit } from '@angular/core';
// import { ListaAlumnoService } from '../../service/lista-alumno/lista-alumno.service';
import { MatDialog } from '@angular/material/dialog';
import { AbmAlumnoComponent } from '../abm-alumno/abm-alumno.component';
import { IAlumno } from '../../shared/interface/alumno.interface';
import { IAbmDialog } from '../../shared/interface/AbmDialog.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ListaAlumnoService } from 'src/app/core/service/lista-alumno/lista-alumno.service';

@Component({
  selector: 'app-lista-alumno',
  templateUrl: './lista-alumno.component.html',
  styleUrls: ['./lista-alumno.component.css'],
})
export class ListaAlumnoComponent implements OnInit {
  listado: IAlumno[] = [];
  displayedColumns: string[] = [
    'Legajo',
    'Alumno',
    'Curso',
    'Nota',
    'Acciones',
  ];
  dataSource!: MatTableDataSource<any>;
  public subcriptionCursos: Subscription = new Subscription();

  constructor(public service: ListaAlumnoService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.subcriptionCursos = this.service.listaAlumnos().subscribe((result) => {
      this.listado = result;
      this.dataSource = new MatTableDataSource(this.listado);
    });
  }

  // public cargarAlumnos() {
  //   this.listado = this.service.listaAlumnos();
  //   this.dataSource = new MatTableDataSource(this.listado);
  // }

  abrirModal() {
    let sendData: IAbmDialog = {
      operacionCod: 1,
      operacionDesc: 'Nuevo Alumno',
      alumno: {
        Legajo: 0,
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

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.service.AbmAlumno(result);
      // this.cargarAlumnos();
    });
  }

  public buscarAlumno(i: number, item: IAlumno) {
    let sendData: IAbmDialog = {
      operacionCod: 3,
      operacionDesc: 'Consultar Alumno',
      alumno: {
        Legajo: i,
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
        Legajo: i,
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
      this.service.AbmAlumno(result);
    });
  }

  public eliminarAlumno(i: number, item: IAlumno) {
    let sendData: IAbmDialog = {
      operacionCod: 4,
      operacionDesc: 'Eliminar Alumno',
      alumno: {
        Legajo: i,
        Nombre: item.Nombre,
        Apellido: item.Apellido,
        Curso: item.Curso,
        Nota: item.Nota,
      },
      post: i,
    };
    this.service.AbmAlumno(sendData);
    // this.cargarAlumnos();
  }
}
