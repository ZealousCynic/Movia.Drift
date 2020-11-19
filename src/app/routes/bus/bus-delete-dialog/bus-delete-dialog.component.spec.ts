import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusBusDeleteDialogComponent } from './bus-delete-dialog.component';

describe('BusDeleteDialogComponent', () => {
  let component: BusBusDeleteDialogComponent;
  let fixture: ComponentFixture<BusBusDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusBusDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusBusDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
