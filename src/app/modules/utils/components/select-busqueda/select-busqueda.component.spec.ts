import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBusquedaComponent } from './select-busqueda.component';

describe('SelectBusquedaComponent', () => {
  let component: SelectBusquedaComponent;
  let fixture: ComponentFixture<SelectBusquedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBusquedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
