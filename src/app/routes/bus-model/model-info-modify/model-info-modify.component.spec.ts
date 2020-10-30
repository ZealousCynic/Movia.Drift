import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusModelModelInfoModifyComponent } from './model-info-modify.component';

describe('ModelInfoModifyComponent', () => {
  let component: BusModelModelInfoModifyComponent;
  let fixture: ComponentFixture<BusModelModelInfoModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusModelModelInfoModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusModelModelInfoModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
