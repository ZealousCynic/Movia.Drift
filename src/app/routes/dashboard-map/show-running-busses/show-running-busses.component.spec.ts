import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMapShowRunningBussesComponent } from './show-running-busses.component';

describe('ShowRunningBussesComponent', () => {
  let component: DashboardMapShowRunningBussesComponent;
  let fixture: ComponentFixture<DashboardMapShowRunningBussesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMapShowRunningBussesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMapShowRunningBussesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
