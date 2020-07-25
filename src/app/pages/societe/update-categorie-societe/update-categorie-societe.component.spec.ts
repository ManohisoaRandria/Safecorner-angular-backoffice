import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCategorieSocieteComponent } from './update-categorie-societe.component';

describe('UpdateCategorieSocieteComponent', () => {
  let component: UpdateCategorieSocieteComponent;
  let fixture: ComponentFixture<UpdateCategorieSocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCategorieSocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCategorieSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
