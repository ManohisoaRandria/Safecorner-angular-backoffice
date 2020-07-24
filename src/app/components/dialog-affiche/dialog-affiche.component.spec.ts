import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAfficheComponent } from './dialog-affiche.component';

describe('DialogAfficheComponent', () => {
  let component: DialogAfficheComponent;
  let fixture: ComponentFixture<DialogAfficheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAfficheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAfficheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
