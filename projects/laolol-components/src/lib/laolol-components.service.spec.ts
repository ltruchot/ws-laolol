import { TestBed } from '@angular/core/testing';

import { LaololComponentsService } from './laolol-components.service';

describe('LaololComponentsService', () => {
  let service: LaololComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaololComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
