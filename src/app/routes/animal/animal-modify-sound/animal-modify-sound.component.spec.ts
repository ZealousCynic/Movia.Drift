import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalAnimalModifySoundComponent } from './animal-modify-sound.component';

describe('AnimalModifySoundComponent', () => {
  let component: AnimalAnimalModifySoundComponent;
  let fixture: ComponentFixture<AnimalAnimalModifySoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalAnimalModifySoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalAnimalModifySoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
