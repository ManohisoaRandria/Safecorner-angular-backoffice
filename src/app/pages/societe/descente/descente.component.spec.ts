import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescenteComponent } from './descente.component';

describe('DescenteComponent', () => {
  let component: DescenteComponent;
  let fixture: ComponentFixture<DescenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
