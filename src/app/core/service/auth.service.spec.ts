import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ISesion } from 'src/app/shared/interface/sesion.interface';
import { IUsuario } from 'src/app/shared/interface/usuario.interface';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { SesionState } from 'src/app/auth/sesion/state/sesion.reducer';
import { Store } from '@ngrx/store';

describe('AuthService', () => {
  let service: AuthService;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  let httpClientSpy: { get: jasmine.Spy };
  const initialState: SesionState = {
    sesionActiva: false,
  };

  const testStore = jasmine.createSpyObj('Store', ['select']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        {
          provide: Store,
          useValue: testStore,
        },
      ],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    service = new AuthService(httpClientSpy as any, routerSpy, testStore);
  });
  it('Debe retornar un arreglo de usuarios', (done: DoneFn) => {
    const mockData = [
      {
        nombre: 'Gaston',
        apellido: 'Nieto',
        user: 'gg',
        pass: '1234',
        id_perfil: 2,
        id: '1',
      },
      {
        nombre: 'Lautaro',
        apellido: 'Garcia',
        user: 'll',
        pass: '1234',
        id_perfil: 66,
        id: '2',
      },
      {
        nombre: 'nombre 3',
        apellido: 'apellido 3',
        user: 'user 3',
        pass: 'pass 3',
        id_perfil: 88,
        id: '3',
      },
      {
        nombre: 'nombre 4',
        apellido: 'apellido 4',
        user: 'user 4',
        pass: 'pass 4',
        id_perfil: 29,
        id: '4',
      },
    ];
    httpClientSpy.get.and.returnValue(of(mockData));
    service.logInApi().subscribe((usuarios) => {
      expect(usuarios).toEqual(mockData);
    });
    done();
  });
});
