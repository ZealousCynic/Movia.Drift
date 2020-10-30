import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalAnimalOverviewComponent } from './animal-overview.component';

describe('AnimalOverviewComponent', () => {
  let component: AnimalAnimalOverviewComponent;
  let fixture: ComponentFixture<AnimalAnimalOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalAnimalOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalAnimalOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
