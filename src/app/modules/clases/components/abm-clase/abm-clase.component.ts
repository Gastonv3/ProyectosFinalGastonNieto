import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ListaCursosService } from 'src/app/core/service/lista-cursos/lista-cursos.service';
// import { ListaCursosService } from 'src/app/service/lista-cursos/lista-cursos.service';
import { IAbmDialog } from 'src/app/shared/interface/AbmDialog.interface';
import { ICurso } from 'src/app/shared/interface/cursos.interface';
import { AbmAlumnoComponent } from '../../../alumnos/components/abm-alumno/abm-alumno.component';

@Component({
  selector: 'app-abm-clase',
  templateUrl: './abm-clase.component.html',
  styleUrls: ['./abm-clase.component.css'],
})
export class AbmClaseComponent implements OnInit {
  public formularioAlta: FormGroup = this._fb.group({
    id: [0],
    dia: ['', [Validators.required]],
    tema: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    curso: [0, [Validators.required]],
    baja: [0, [Validators.required]],
  });
  public item: IAbmDialog = {
    operacionCod: 0,
    operacionDesc: '',
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

  public subcriptionCursos: Subscription = new Subscription();
  public textButton: string = '';
  public listado: ICurso[] = [];

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<AbmAlumnoComponent>,
    public serviceCursos: ListaCursosService,
    @Inject(MAT_DIALOG_DATA) public data: IAbmDialog
  ) {
    this.subcriptionCursos = this.serviceCursos
      .listarCursos()
      .subscribe((result) => {
        console.log(this.listado);
        this.listado = result;
      });

    this.item.operacionCod = data.operacionCod;
    this.item.operacionDesc = data.operacionDesc;
    this.item.post = data.post;
    this.formularioAlta.setValue({
      id: data.clase!.id,
      dia: data.clase!.dia,
      tema: data.clase!.tema,
      descripcion: data.clase!.descripcion,
      curso: data.clase!.curso,
      baja: data.clase!.baja,
    });
    if (data.operacionCod == 3) this.formularioAlta.disable();
    if (data.operacionCod == 1) this.textButton = 'Insertar';
    if (data.operacionCod == 2) this.textButton = 'Actualizar';
  }

  ngOnDestroy(): void {
    this.subcriptionCursos.unsubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public CargarAlumno() {
    this.item.clase!.dia = this.formularioAlta.get('dia')?.value;
    this.item.clase!.tema = this.formularioAlta.get('tema')?.value;
    this.item.clase!.descripcion =
      this.formularioAlta.get('descripcion')?.value;
    this.item.clase!.curso = this.formularioAlta.get('curso')?.value;
    this.item.clase!.baja = this.formularioAlta.get('baja')?.value;
  }

  ngOnInit(): void {}
}
