import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertSocieteDesinfectionComponent } from './insert-societe-desinfection.component';

describe('InsertSocieteDesinfectionComponent', () => {
  let component: InsertSocieteDesinfectionComponent;
  let fixture: ComponentFixture<InsertSocieteDesinfectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertSocieteDesinfectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertSocieteDesinfectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
