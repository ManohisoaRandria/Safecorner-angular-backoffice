import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertPrestationComponent } from './insert-prestation.component';

describe('InsertPrestationComponent', () => {
  let component: InsertPrestationComponent;
  let fixture: ComponentFixture<InsertPrestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertPrestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertPrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
