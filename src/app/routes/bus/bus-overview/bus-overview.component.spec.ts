import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusBusOverviewComponent } from './bus-overview.component';

describe('BusOverviewComponent', () => {
  let component: BusBusOverviewComponent;
  let fixture: ComponentFixture<BusBusOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusBusOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusBusOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
