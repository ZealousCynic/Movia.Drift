import { TestBed } from '@angular/core/testing';

import { PlaceRepositoryService } from './place-repository.service';

describe('PlaceRepositoryService', () => {
  let service: PlaceRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
