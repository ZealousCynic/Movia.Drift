import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalAnimalModifyComponent } from './animal-modify.component';

describe('AnimalModifyComponent', () => {
  let component: AnimalAnimalModifyComponent;
  let fixture: ComponentFixture<AnimalAnimalModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalAnimalModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalAnimalModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
