import { TestBed, inject } from '@angular/core/testing';

import { SecurityGuard } from './security.guard';

describe('SecurityGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurityGuard]
    });
  });

  it('should ...', inject([SecurityGuard], (guard: SecurityGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should return true', () => {
    const value = true;
    const guard: SecurityGuard = TestBed.inject(SecurityGuard);
    guard.canActivate();
    expect(guard.canActivate()).toBe(value);
  });
});
