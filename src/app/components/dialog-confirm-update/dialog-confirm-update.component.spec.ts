import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmUpdateComponent } from './dialog-confirm-update.component';

describe('DialogConfirmUpdateComponent', () => {
  let component: DialogConfirmUpdateComponent;
  let fixture: ComponentFixture<DialogConfirmUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConfirmUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
