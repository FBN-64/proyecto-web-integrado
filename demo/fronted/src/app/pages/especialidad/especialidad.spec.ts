import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Especialidad } from './especialidad';

describe('Especialidad', () => {
  let component: Especialidad;
  let fixture: ComponentFixture<Especialidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Especialidad],
    }).compileComponents();

    fixture = TestBed.createComponent(Especialidad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
