import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPrestationComponent } from './modify-prestation.component';

describe('ModifyPrestationComponent', () => {
  let component: ModifyPrestationComponent;
  let fixture: ComponentFixture<ModifyPrestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyPrestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
