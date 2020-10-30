import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusStopStopOverviewComponent } from './stop-overview.component';

describe('StopOverviewComponent', () => {
  let component: BusStopStopOverviewComponent;
  let fixture: ComponentFixture<BusStopStopOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusStopStopOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusStopStopOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
