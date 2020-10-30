import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusRouteRouteInfoModifyComponent } from './route-info-modify.component';

describe('RouteInfoModifyComponent', () => {
  let component: BusRouteRouteInfoModifyComponent;
  let fixture: ComponentFixture<BusRouteRouteInfoModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusRouteRouteInfoModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusRouteRouteInfoModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
