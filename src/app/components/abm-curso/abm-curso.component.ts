import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAbmDialog } from 'src/app/shared/interface/AbmDialog.interface';
import { AbmAlumnoComponent } from '../abm-alumno/abm-alumno.component';

@Component({
  selector: 'app-abm-curso',
  templateUrl: './abm-curso.component.html',
  styleUrls: ['./abm-curso.component.css'],
})
export class AbmCursoComponent implements OnInit {
  public formularioAlta: FormGroup = this._fb.group({
    id: [0],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    nivel: [0, [Validators.required]],
    baja: [0, [Validators.required]],
  });
  public item: IAbmDialog = {
    operacionCod: 0,
    operacionDesc: '',
    cursos: { Id: 0, Nombre: '', Descripcion: '', Nivel: 0, Baja: 0 },
    post: 0,
  };

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<AbmAlumnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAbmDialog
  ) {
    this.item.operacionCod = data.operacionCod;
    this.item.operacionDesc = data.operacionDesc;
    this.item.post = data.post;
    this.formularioAlta.setValue({
      id: data.cursos!.Id,
      nombre: data.cursos!.Nombre,
      descripcion: data.cursos!.Descripcion,
      nivel: data.cursos!.Nivel,
      baja: data.cursos!.Baja,
    });

    if (this.item.operacionCod == 3) {
      this.formularioAlta.controls['baja'].disable();
    }
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public CargarCurso() {
    console.log(this.formularioAlta.status);
    this.item.cursos!.Nombre = this.formularioAlta.get('nombre')?.value;
    this.item.cursos!.Descripcion =
      this.formularioAlta.get('descripcion')?.value;
    this.item.cursos!.Nivel = this.formularioAlta.get('nivel')?.value;
    this.item.cursos!.Baja = this.formularioAlta.get('baja')?.value;
    this.item.cursos!.Id = this.formularioAlta.get('id')?.value;
  }
}
