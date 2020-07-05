import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertSocieteComponent } from './insert-societe.component';

describe('InsertSocieteComponent', () => {
  let component: InsertSocieteComponent;
  let fixture: ComponentFixture<InsertSocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertSocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
