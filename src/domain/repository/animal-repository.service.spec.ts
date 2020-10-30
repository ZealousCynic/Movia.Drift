import { TestBed } from '@angular/core/testing';

import { AnimalRepositoryService } from './animal-repository.service';

describe('AnimalRepositoryService', () => {
  let service: AnimalRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
