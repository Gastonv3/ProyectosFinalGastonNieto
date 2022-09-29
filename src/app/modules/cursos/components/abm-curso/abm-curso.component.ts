import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbmAlumnoComponent } from 'src/app/modules/alumnos/components/abm-alumno/abm-alumno.component';
import { IAbmDialog } from 'src/app/shared/interface/AbmDialog.interface';

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
    cursos: { id: 0, Nombre: '', Descripcion: '', Nivel: 0, Baja: 0 },
    post: 0,
  };
  public textButton: string = '';

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<AbmAlumnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAbmDialog
  ) {
    this.item.operacionCod = data.operacionCod;
    this.item.operacionDesc = data.operacionDesc;
    this.item.post = data.post;
    this.formularioAlta.setValue({
      id: data.cursos!.id,
      nombre: data.cursos!.Nombre,
      descripcion: data.cursos!.Descripcion,
      nivel: data.cursos!.Nivel,
      baja: data.cursos!.Baja,
    });

    if (data.operacionCod == 3) this.formularioAlta.disable();
    if (data.operacionCod == 1) this.textButton = 'Insertar';
    if (data.operacionCod == 2) this.textButton = 'Actualizar';
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public CargarCurso() {
    this.item.cursos!.Nombre = this.formularioAlta.get('nombre')?.value;
    this.item.cursos!.Descripcion =
      this.formularioAlta.get('descripcion')?.value;
    this.item.cursos!.Nivel = this.formularioAlta.get('nivel')?.value;
    this.item.cursos!.Baja = this.formularioAlta.get('baja')?.value;
    this.item.cursos!.id = this.formularioAlta.get('id')?.value;
  }
}
