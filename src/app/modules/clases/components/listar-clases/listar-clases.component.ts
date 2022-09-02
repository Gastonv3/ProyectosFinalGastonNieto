import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ListarClasesService } from 'src/app/core/service/listar-clases/listar-clases.service';
// import { ListarClasesService } from 'src/app/service/listar-clases/listar-clases.service';
import { IAbmDialog } from 'src/app/shared/interface/AbmDialog.interface';
import { IClases } from '../../../../shared/interface/clases.interface';
import { AbmClaseComponent } from '../abm-clase/abm-clase.component';

@Component({
  selector: 'app-listar-clases',
  templateUrl: './listar-clases.component.html',
  styleUrls: ['./listar-clases.component.css'],
})
export class ListarClasesComponent implements OnInit {
  public listado: IClases[] = [];
  public displayedColumns: string[] = [
    'Id',
    'Día',
    'Clase',
    'Descripción',
    'Curso',
    'Estado',
    'Acciones',
  ];
  public dataSource!: MatTableDataSource<any>;

  public subcriptionCursos: Subscription = new Subscription();
  constructor(public service: ListarClasesService, private dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.subcriptionCursos.unsubscribe();
  }
  ngOnInit(): void {
    this.subcriptionCursos = this.service.listarClases().subscribe((result) => {
      this.listado = result;
      this.dataSource = new MatTableDataSource(this.listado);
    });
  }

  abrirModal() {
    let sendData: IAbmDialog = {
      operacionCod: 1,
      operacionDesc: 'Nuevo Clase',
      clase: {
        id: this.listado.length + 1,
        dia: '',
        tema: '',
        nro: 0,
        descripcion: '',
        baja: 0,
        curso: 0,
        // curso: {
        //   Nombre: '',
        //   Descripcion: '',
        //   Nivel: 0,
        //   Baja: 0,
        // },
      },
      post: 0,
    };
    const dialogRef = this.dialog.open(AbmClaseComponent, {
      width: '500px',

      data: sendData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.service.procesarAbm(result);
    });
  }

  public buscarClase(i: number, item: IClases) {
    let sendData: IAbmDialog = {
      operacionCod: 3,
      operacionDesc: 'Consultar Clase',
      clase: {
        id: item.id,
        dia: item.dia,
        tema: item.tema,
        nro: item.nro,
        descripcion: item.descripcion,
        baja: item.baja,
        curso: item.curso,
        // curso: {
        //   Nombre: '',
        //   Descripcion: '',
        //   Nivel: 0,
        //   Baja: 0,
        // },
      },
      post: i,
    };
    const dialogRef = this.dialog.open(AbmClaseComponent, {
      width: '500px',
      data: sendData,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  public modificarClase(i: number, item: IClases) {
    let sendData: IAbmDialog = {
      operacionCod: 2,
      operacionDesc: 'Modificar Clase',
      clase: {
        id: item.id,
        dia: item.dia,
        tema: item.tema,
        nro: item.nro,
        descripcion: item.descripcion,
        baja: item.baja,
        curso: item.curso,
        // curso: {
        //   Nombre: '',
        //   Descripcion: '',
        //   Nivel: 0,
        //   Baja: 0,
        // },
      },
      post: i,
    };
    const dialogRef = this.dialog.open(AbmClaseComponent, {
      width: '500px',

      data: sendData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.service.procesarAbm(result);
    });
  }
}
