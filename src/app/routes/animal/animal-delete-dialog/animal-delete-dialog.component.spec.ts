import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalAnimalDeleteDialogComponent } from './animal-delete-dialog.component';

describe('AnimalDeleteDialogComponent', () => {
  let component: AnimalAnimalDeleteDialogComponent;
  let fixture: ComponentFixture<AnimalAnimalDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalAnimalDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalAnimalDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
