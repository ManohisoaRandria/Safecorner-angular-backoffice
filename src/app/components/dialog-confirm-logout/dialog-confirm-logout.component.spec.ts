import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmLogoutComponent } from './dialog-confirm-logout.component';

describe('DialogConfirmLogoutComponent', () => {
  let component: DialogConfirmLogoutComponent;
  let fixture: ComponentFixture<DialogConfirmLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConfirmLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
