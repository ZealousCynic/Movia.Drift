import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusDriverBusDriverDeleteDialogComponent } from './bus-driver-delete-dialog.component';

describe('BusDriverDeleteDialogComponent', () => {
  let component: BusDriverBusDriverDeleteDialogComponent;
  let fixture: ComponentFixture<BusDriverBusDriverDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusDriverBusDriverDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusDriverBusDriverDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
