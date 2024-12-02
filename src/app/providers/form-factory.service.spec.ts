import { TestBed } from '@angular/core/testing';

import { FormFactoryService } from './form-factory.service';

describe('FormFactoryService', () => {
  let service: FormFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
