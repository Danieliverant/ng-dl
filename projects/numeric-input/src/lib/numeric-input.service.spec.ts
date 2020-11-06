import { TestBed } from '@angular/core/testing';

import { NumericInputService } from './numeric-input.service';

describe('NumericInputService', () => {
  let service: NumericInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumericInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
