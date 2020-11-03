import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMapMapComponent } from './map.component';

describe('MapComponent', () => {
  let component: DashboardMapMapComponent;
  let fixture: ComponentFixture<DashboardMapMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMapMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMapMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
