import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusRouteRouteBusdriverModifyComponent } from './route-busdriver-modify.component';

describe('RouteBusdriverModifyComponent', () => {
  let component: BusRouteRouteBusdriverModifyComponent;
  let fixture: ComponentFixture<BusRouteRouteBusdriverModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusRouteRouteBusdriverModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusRouteRouteBusdriverModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
