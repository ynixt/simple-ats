import { TestBed } from '@angular/core/testing';

import { AuthEffects } from './auth.effects';

describe('Auth.EffectsService', () => {
  let service: AuthEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthEffects);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
