import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusRouteRouteOverviewComponent } from './route-overview.component';

describe('RouteOverviewComponent', () => {
  let component: BusRouteRouteOverviewComponent;
  let fixture: ComponentFixture<BusRouteRouteOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusRouteRouteOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusRouteRouteOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
