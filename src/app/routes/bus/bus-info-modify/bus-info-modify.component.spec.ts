import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusBusInfoModifyComponent } from './bus-info-modify.component';

describe('BusInfoModifyComponent', () => {
  let component: BusBusInfoModifyComponent;
  let fixture: ComponentFixture<BusBusInfoModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusBusInfoModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusBusInfoModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
