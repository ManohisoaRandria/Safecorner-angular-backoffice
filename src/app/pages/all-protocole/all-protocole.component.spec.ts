import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProtocoleComponent } from './all-protocole.component';

describe('AllProtocoleComponent', () => {
  let component: AllProtocoleComponent;
  let fixture: ComponentFixture<AllProtocoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProtocoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProtocoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
