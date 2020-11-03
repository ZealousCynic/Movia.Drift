import { TestBed } from '@angular/core/testing';

import { BusstopRepositoryService } from './busstop-repository.service';

describe('BusstopRepositoryService', () => {
  let service: BusstopRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusstopRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
