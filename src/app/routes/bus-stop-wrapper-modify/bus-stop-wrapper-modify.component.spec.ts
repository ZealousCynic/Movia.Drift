import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusStopBusStopWrapperModifyComponent } from './bus-stop-wrapper-modify.component';

describe('BusStopWrapperModifyComponent', () => {
  let component: BusStopBusStopWrapperModifyComponent;
  let fixture: ComponentFixture<BusStopBusStopWrapperModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusStopBusStopWrapperModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusStopBusStopWrapperModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
