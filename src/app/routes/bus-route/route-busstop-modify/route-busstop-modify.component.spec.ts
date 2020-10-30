import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusRouteRouteBusstopModifyComponent } from './route-busstop-modify.component';

describe('RouteBusstopModifyComponent', () => {
  let component: BusRouteRouteBusstopModifyComponent;
  let fixture: ComponentFixture<BusRouteRouteBusstopModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusRouteRouteBusstopModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusRouteRouteBusstopModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
