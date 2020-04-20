import { TestBed } from '@angular/core/testing';

import { LaololStorybookService } from './laolol-storybook.service';

describe('LaololStorybookService', () => {
  let service: LaololStorybookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaololStorybookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
