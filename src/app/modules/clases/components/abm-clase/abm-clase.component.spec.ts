import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmClaseComponent } from './abm-clase.component';

describe('AbmClaseComponent', () => {
  let component: AbmClaseComponent;
  let fixture: ComponentFixture<AbmClaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmClaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
