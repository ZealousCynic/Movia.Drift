import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalAnimalModifyQRCodeComponent } from './animal-modify-qrcode.component';

describe('AnimalModifyQRCodeComponent', () => {
  let component: AnimalAnimalModifyQRCodeComponent;
  let fixture: ComponentFixture<AnimalAnimalModifyQRCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalAnimalModifyQRCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalAnimalModifyQRCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
