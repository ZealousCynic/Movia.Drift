import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalAnimalModifyAlbumComponent } from './animal-modify-album.component';

describe('AnimalModifyAlbumComponent', () => {
  let component: AnimalAnimalModifyAlbumComponent;
  let fixture: ComponentFixture<AnimalAnimalModifyAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalAnimalModifyAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalAnimalModifyAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
