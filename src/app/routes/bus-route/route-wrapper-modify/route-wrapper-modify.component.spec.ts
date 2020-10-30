import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusRouteRouteWrapperModifyComponent } from './route-wrapper-modify.component';

describe('RouteWrapperModifyComponent', () => {
  let component: BusRouteRouteWrapperModifyComponent;
  let fixture: ComponentFixture<BusRouteRouteWrapperModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusRouteRouteWrapperModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusRouteRouteWrapperModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
