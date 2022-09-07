import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICurso } from 'src/app/shared/interface/cursos.interface';
import { MatTableDataSource } from '@angular/material/table';
// import { ListaCursosService } from 'src/app/service/lista-cursos/lista-cursos.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AbmCursoComponent } from '../abm-curso/abm-curso.component';
import { IAbmDialog } from 'src/app/shared/interface/AbmDialog.interface';
import { ListaCursosService } from 'src/app/core/service/lista-cursos/lista-cursos.service';
import { CursosModule } from '../../cursos.module';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css'],
})
export class ListaCursosComponent implements OnInit, OnDestroy {
  public listado: ICurso[] = [];
  public displayedColumns: string[] = [
    'Id',
    'Nombre',
    'Descripción',
    'Nivel',
    'Estado',
    'Acciones',
  ];
  public dataSource!: MatTableDataSource<any>;

  public subcriptionCursos: Subscription = new Subscription();

  constructor(public service: ListaCursosService, private dialog: MatDialog) {}
  ngOnDestroy(): void {
    this.subcriptionCursos.unsubscribe();
  }
  ngOnInit(): void {
    this.subcriptionCursos = this.service.listarCursos().subscribe((result) => {
      this.listado = result;
      this.dataSource = new MatTableDataSource(this.listado);
    });
  }

  abrirModal() {
    let sendData: IAbmDialog = {
      operacionCod: 1,
      operacionDesc: 'Nuevo Curso',
      cursos: {
        id: 0,
        Nombre: '',
        Descripcion: '',
        Nivel: 0,
        Baja: 0,
      },
      post: 0,
    };
    const dialogRef = this.dialog.open(AbmCursoComponent, {
      width: '500px',

      data: sendData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // this.service.procesarAbm(result);
      this.service.cargarCurso(result.cursos!).subscribe((curso) => {
        this.ngOnInit();
      });
    });
  }

  public buscarCurso(i: number, item: ICurso) {
    let sendData: IAbmDialog = {
      operacionCod: 3,
      operacionDesc: 'Consultar Curso',
      cursos: {
        id: item.id,
        Nombre: item.Nombre,
        Descripcion: item.Descripcion,
        Nivel: item.Nivel,
        Baja: item.Baja,
      },
      post: i,
    };
    const dialogRef = this.dialog.open(AbmCursoComponent, {
      width: '500px',
      data: sendData,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  public modificarCurso(i: number, item: ICurso) {
    let sendData: IAbmDialog = {
      operacionCod: 2,
      operacionDesc: 'Modificar Curso',
      cursos: {
        id: item.id,
        Nombre: item.Nombre,
        Descripcion: item.Descripcion,
        Nivel: item.Nivel,
        Baja: item.Baja,
      },
      post: i,
    };
    const dialogRef = this.dialog.open(AbmCursoComponent, {
      width: '500px',

      data: sendData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // this.service.procesarAbm(result);
      if (result.cursos.id) {
        this.service.modificarCurso(result.cursos!).subscribe((curso) => {
          this.ngOnInit();
        });
      }
    });
  }

  public eliminarCurso(i: number, item: ICurso) {
    let sendData: IAbmDialog = {
      operacionCod: 4,
      operacionDesc: 'Eliminar Alumno',
      cursos: {
        id: item.id,
        Nombre: item.Nombre,
        Descripcion: item.Descripcion,
        Nivel: item.Nivel,
        Baja: item.Baja,
      },
      post: i,
    };
    // this.service.procesarAbm(sendData);
  }
}
