import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { ListaCursosService } from 'src/app/core/service/lista-cursos/lista-cursos.service';
import { ListarClasesService } from 'src/app/core/service/listar-clases/listar-clases.service';
import { IAbmDialog } from 'src/app/shared/interface/AbmDialog.interface';
import { IClases } from '../../../../shared/interface/clases.interface';
import { AbmClaseComponent } from '../abm-clase/abm-clase.component';
import { ClasesState } from '../../state/clases.reducer';
import { Store } from '@ngrx/store';
import { cargarClases } from '../../state/clases.actions';
import {
  selectCargandoState,
  selectClasesCargandosState,
} from '../../state/clases.selectors';

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
  public cargando$!: Observable<boolean>;
  public subcriptionCursos: Subscription = new Subscription();
  constructor(
    public service: ListarClasesService,
    private dialog: MatDialog,
    public serviceCurso: ListaCursosService,
    public store: Store<ClasesState>
  ) {}

  ngOnDestroy(): void {
    this.subcriptionCursos.unsubscribe();
  }
  ngOnInit(): void {
    this.store.dispatch(cargarClases());
    this.store.select(selectClasesCargandosState).subscribe((clases) => {
      this.listado = clases!;
      this.dataSource = new MatTableDataSource(this.listado);
    });
    this.cargando$ = this.store.select(selectCargandoState);
  }

  public abrirModal() {
    let sendData: IAbmDialog = {
      operacionCod: 1,
      operacionDesc: 'Nuevo Clase',
      clase: {
        id: 0,
        dia: '',
        tema: '',
        nro: 0,
        descripcion: '',
        baja: 0,
        curso: 0,
      },
      post: 0,
    };
    const dialogRef = this.dialog.open(AbmClaseComponent, {
      width: '500px',

      data: sendData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.cargarClases(result.clase!).subscribe((clases) => {
          this.store.dispatch(cargarClases());
          this.store.select(selectClasesCargandosState).subscribe((clases) => {
            this.listado = clases!;
            this.dataSource = new MatTableDataSource(this.listado);
          });
          this.cargando$ = this.store.select(selectCargandoState);
        });
      }
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
      },
      post: i,
    };
    const dialogRef = this.dialog.open(AbmClaseComponent, {
      width: '500px',

      data: sendData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.modificarClases(result.clase!).subscribe((clases) => {
          this.store.dispatch(cargarClases());
          this.store.select(selectClasesCargandosState).subscribe((clases) => {
            this.listado = clases!;
            this.dataSource = new MatTableDataSource(this.listado);
          });
          this.cargando$ = this.store.select(selectCargandoState);
        });
      }
    });
  }
}
