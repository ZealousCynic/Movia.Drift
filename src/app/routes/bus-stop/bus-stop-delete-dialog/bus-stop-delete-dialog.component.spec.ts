import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusStopBusStopDeleteDialogComponent } from './bus-stop-delete-dialog.component';

describe('BusStopDeleteDialogComponent', () => {
  let component: BusStopBusStopDeleteDialogComponent;
  let fixture: ComponentFixture<BusStopBusStopDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusStopBusStopDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusStopBusStopDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
