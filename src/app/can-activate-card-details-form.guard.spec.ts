import { TestBed } from '@angular/core/testing';

import { CanActivateCardDetailsFormGuard } from './can-activate-card-details-form.guard';

describe('CanActivateCardDetailsFormGuard', () => {
  let guard: CanActivateCardDetailsFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanActivateCardDetailsFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
