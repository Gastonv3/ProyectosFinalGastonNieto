import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';

import { IAbmDialog } from 'src/app/shared/interface/AbmDialog.interface';

import { Subscription } from 'rxjs';
import { ICurso } from 'src/app/shared/interface/cursos.interface';
import { ListaCursosService } from 'src/app/core/service/lista-cursos/lista-cursos.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
/** Error when invalid control is dirty, touched, or submitted. */

@Component({
  selector: 'app-abm-alumno',
  templateUrl: './abm-alumno.component.html',
  styleUrls: ['./abm-alumno.component.css'],
})
export class AbmAlumnoComponent implements OnInit, OnDestroy {
  public formularioAlta: FormGroup = this._fb.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    curso: ['', [Validators.required]],
    nota: [0, [Validators.required, Validators.max(10), Validators.min(1)]],
  });

  public textButton: string = '';
  public listado: ICurso[] = [];

  public item: IAbmDialog = {
    operacionCod: 0,
    operacionDesc: '',
    alumno: { Nombre: '', Apellido: '', Curso: 0, Nota: 0, id: 0 },
    post: 0,
  };

  public subcriptionCursos: Subscription = new Subscription();

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<AbmAlumnoComponent>,
    public serviceCursos: ListaCursosService,
    @Inject(MAT_DIALOG_DATA) public data: IAbmDialog
  ) {
    this.subcriptionCursos = this.serviceCursos
      .listarCursos()
      .subscribe((result) => {
        this.listado = result;
      });
    this.item.operacionCod = data.operacionCod;
    this.item.operacionDesc = data.operacionDesc;
    this.item.post = data.post;
    this.item.alumno!.id = data.alumno?.id;
    this.formularioAlta.setValue({
      nombre: data.alumno!.Nombre,
      apellido: data.alumno!.Apellido,
      curso: data.alumno!.Curso,
      nota: data.alumno!.Nota,
    });

    if (data.operacionCod == 3) this.formularioAlta.disable();
    if (data.operacionCod == 1) this.textButton = 'Insertar';
    if (data.operacionCod == 2) this.textButton = 'Actualizar';

    // this.formularioAlta.get('nombre')!.disable();
    // this.formularioAlta.get('nombre')!.disable();
    // this.formularioAlta.get('nombre')!.disable();
  }

  ngOnDestroy(): void {
    this.subcriptionCursos.unsubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public CargarAlumno() {
    this.item.alumno!.Nombre = this.formularioAlta.get('nombre')?.value;
    this.item.alumno!.Apellido = this.formularioAlta.get('apellido')?.value;
    this.item.alumno!.Curso = this.formularioAlta.get('curso')?.value;
    this.item.alumno!.Nota = this.formularioAlta.get('nota')?.value;
  }
  ngOnInit(): void {}
}
