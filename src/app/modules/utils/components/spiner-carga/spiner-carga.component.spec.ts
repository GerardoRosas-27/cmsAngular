import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinerCargaComponent } from './spiner-carga.component';

describe('SpinerCargaComponent', () => {
  let component: SpinerCargaComponent;
  let fixture: ComponentFixture<SpinerCargaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinerCargaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinerCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
