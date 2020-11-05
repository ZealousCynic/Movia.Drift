import { TestBed } from '@angular/core/testing';

import { MapRepositoryService } from './map-repository.service';

describe('MapRepositoryService', () => {
  let service: MapRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
