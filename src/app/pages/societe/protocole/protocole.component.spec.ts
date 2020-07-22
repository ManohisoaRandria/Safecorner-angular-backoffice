import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocoleComponent } from './protocole.component';

describe('ProtocoleComponent', () => {
  let component: ProtocoleComponent;
  let fixture: ComponentFixture<ProtocoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
