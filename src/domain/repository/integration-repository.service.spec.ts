import { TestBed } from '@angular/core/testing';

import { IntegrationRepositoryService } from './integration-repository.service';

describe('IntegrationRepositoryService', () => {
  let service: IntegrationRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntegrationRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
