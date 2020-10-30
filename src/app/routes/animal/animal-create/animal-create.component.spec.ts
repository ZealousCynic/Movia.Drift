import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalAnimalCreateComponent } from './animal-create.component';

describe('AnimalCreateComponent', () => {
  let component: AnimalAnimalCreateComponent;
  let fixture: ComponentFixture<AnimalAnimalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalAnimalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalAnimalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
