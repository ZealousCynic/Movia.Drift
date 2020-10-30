import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusDriverDriverOverviewComponent } from './driver-overview.component';

describe('DriverOverviewComponent', () => {
  let component: BusDriverDriverOverviewComponent;
  let fixture: ComponentFixture<BusDriverDriverOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusDriverDriverOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusDriverDriverOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
