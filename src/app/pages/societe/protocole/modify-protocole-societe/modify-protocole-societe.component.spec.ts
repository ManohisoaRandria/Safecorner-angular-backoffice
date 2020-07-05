import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyProtocoleSocieteComponent } from './modify-protocole-societe.component';

describe('ModifyProtocoleSocieteComponent', () => {
  let component: ModifyProtocoleSocieteComponent;
  let fixture: ComponentFixture<ModifyProtocoleSocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyProtocoleSocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyProtocoleSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
