import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusModelModelOverviewComponent } from './model-overview.component';

describe('ModelOverviewComponent', () => {
  let component: BusModelModelOverviewComponent;
  let fixture: ComponentFixture<BusModelModelOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusModelModelOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusModelModelOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
