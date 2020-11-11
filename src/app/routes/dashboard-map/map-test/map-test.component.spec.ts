import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMapMapTestComponent } from './map-test.component';

describe('MapTestComponent', () => {
  let component: DashboardMapMapTestComponent;
  let fixture: ComponentFixture<DashboardMapMapTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMapMapTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMapMapTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
