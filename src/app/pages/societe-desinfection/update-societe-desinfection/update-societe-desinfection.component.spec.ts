import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSocieteDesinfectionComponent } from './update-societe-desinfection.component';

describe('UpdateSocieteDesinfectionComponent', () => {
  let component: UpdateSocieteDesinfectionComponent;
  let fixture: ComponentFixture<UpdateSocieteDesinfectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSocieteDesinfectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSocieteDesinfectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
