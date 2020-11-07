import { TestBed } from '@angular/core/testing';

import { BusmodelRepositoryService } from './busmodel-repository.service';

describe('BusmodelRepositoryService', () => {
  let service: BusmodelRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusmodelRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
