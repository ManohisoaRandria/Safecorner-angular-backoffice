import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProtocoleComponent } from './update-protocole.component';

describe('UpdateProtocoleComponent', () => {
  let component: UpdateProtocoleComponent;
  let fixture: ComponentFixture<UpdateProtocoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProtocoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProtocoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
