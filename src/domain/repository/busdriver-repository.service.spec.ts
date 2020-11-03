import { TestBed } from '@angular/core/testing';

import { BusdriverRepositoryService } from './busdriver-repository.service';

describe('BusdriverRepositoryService', () => {
  let service: BusdriverRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusdriverRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
