import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalAnimalModifyProfileComponent } from './animal-modify-profile.component';

describe('AnimalModifyProfileComponent', () => {
  let component: AnimalAnimalModifyProfileComponent;
  let fixture: ComponentFixture<AnimalAnimalModifyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalAnimalModifyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalAnimalModifyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
