import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusDriverDriverInfoModifyComponent } from './driver-info-modify.component';

describe('DriverInfoModifyComponent', () => {
  let component: BusDriverDriverInfoModifyComponent;
  let fixture: ComponentFixture<BusDriverDriverInfoModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusDriverDriverInfoModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusDriverDriverInfoModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
