import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusModelModelDeleteDialogComponent } from './model-delete-dialog.component';

describe('ModelDeleteDialogComponent', () => {
  let component: BusModelModelDeleteDialogComponent;
  let fixture: ComponentFixture<BusModelModelDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusModelModelDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusModelModelDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
