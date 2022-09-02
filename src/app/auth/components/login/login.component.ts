import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { IUsuario } from '../../../shared/interface/usuario.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;

  formulario: FormGroup = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', [Validators.required]),
  });
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}
  public login() {
    const usuario: IUsuario = {
      user: this.formulario.value.usuario,
      pass: this.formulario.value.contrasena,
      id_perfil: 0,
      id: 1,
    };
    this.auth.logIn(usuario);
    // this.router.navigate(['inicio']);
  }
}
