import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertProtocoleSocieteComponent } from './insert-protocole-societe.component';

describe('InsertProtocoleSocieteComponent', () => {
  let component: InsertProtocoleSocieteComponent;
  let fixture: ComponentFixture<InsertProtocoleSocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertProtocoleSocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertProtocoleSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
