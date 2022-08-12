import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { IAbmDialog } from 'src/app/shared/interface/AbmDialog.interface';
import { IAlumno } from '../../shared/interface/alumno.interface';

@Component({
  selector: 'app-abm-alumno',
  templateUrl: './abm-alumno.component.html',
  styleUrls: ['./abm-alumno.component.css'],
})
export class AbmAlumnoComponent implements OnInit {
  public formularioAlta: FormGroup = this._fb.group({
    nombre: ['', [Validators.required]],
    curso: ['', [Validators.required]],
    nota: ['', [Validators.required]],
  });
  public item: IAbmDialog = {
    operacionCod: 0,
    operacionDesc: '',
    alumno: { Nombre: '', Curso: '', Nota: 0 },
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
      nombre: data.alumno.Nombre,
      curso: data.alumno.Curso,
      nota: data.alumno.Nota,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public CargarAlumno() {
    console.log(this.formularioAlta.status);
    this.item.alumno.Nombre = this.formularioAlta.get('nombre')?.value;
    this.item.alumno.Curso = this.formularioAlta.get('curso')?.value;
    this.item.alumno.Nota = this.formularioAlta.get('nota')?.value;
  }
  ngOnInit(): void {}
  // public animal: string = '';
  // public name: string = '';

  // constructor(public dialog: MatDialog) {}

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(AbmAlumnoComponent, {
  //     width: '250px',
  //     data: { name: this.name, animal: this.animal },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }
}
