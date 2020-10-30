import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusRouteRouteDeleteDialogComponent } from './route-delete-dialog.component';

describe('RouteDeleteDialogComponent', () => {
  let component: BusRouteRouteDeleteDialogComponent;
  let fixture: ComponentFixture<BusRouteRouteDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusRouteRouteDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusRouteRouteDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
