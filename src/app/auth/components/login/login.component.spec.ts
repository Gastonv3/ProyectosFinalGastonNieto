import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from '../../../core/service/auth.service';
import { Store } from '@ngrx/store';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const testStore = jasmine.createSpyObj('Store', ['select']);

  // { provide: Router, useValue: routerSpy }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        {
          provide: Store,
          useValue: testStore,
        },
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('Componente creado', () => {
    expect(component).toBeTruthy();
  });

  it('Testea que el estado inicial del formulario sea invalid', () => {
    expect(component.formulario.status).toEqual('INVALID');
  });
  it('Testea que el estado inicial del formulario sea invalid para una carga parcial del formulario', () => {
    const formulario = component.formulario;
    formulario.controls['usuario'].setValue('gaston');
    expect(component.formulario.status).toEqual('INVALID');
  });
  it('Testea que el estado inicial del formulario sea VALID para una carga completa del formulario', () => {
    const formulario = component.formulario;
    formulario.controls['usuario'].setValue('gaston');
    formulario.controls['contrasena'].setValue('1234');
    expect(component.formulario.status).toEqual('VALID');
  });
});
