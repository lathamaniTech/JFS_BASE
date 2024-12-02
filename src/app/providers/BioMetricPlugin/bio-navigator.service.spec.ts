import { TestBed } from '@angular/core/testing';

import { BioNavigatorService } from './bio-navigator.service';

describe('BioNavigatorService', () => {
  let service: BioNavigatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BioNavigatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
