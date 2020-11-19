import { TestBed } from '@angular/core/testing';

import { BusRepositoryService } from './bus-repository.service';

describe('BusRepositoryService', () => {
  let service: BusRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
