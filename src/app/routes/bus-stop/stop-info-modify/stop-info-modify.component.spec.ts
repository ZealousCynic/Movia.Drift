import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusStopStopInfoModifyComponent } from './stop-info-modify.component';

describe('StopInfoModifyComponent', () => {
  let component: BusStopStopInfoModifyComponent;
  let fixture: ComponentFixture<BusStopStopInfoModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusStopStopInfoModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusStopStopInfoModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
