import { TestBed } from '@angular/core/testing';

import { RouteRepositoryService } from './route-repository.service';

describe('RouteRepositoryService', () => {
  let service: RouteRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
