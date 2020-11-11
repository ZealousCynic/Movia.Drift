import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMapRunningBusDetailsComponent } from './running-bus-details.component';

describe('RunningBusDetailsComponent', () => {
  let component: DashboardMapRunningBusDetailsComponent;
  let fixture: ComponentFixture<DashboardMapRunningBusDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMapRunningBusDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMapRunningBusDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
