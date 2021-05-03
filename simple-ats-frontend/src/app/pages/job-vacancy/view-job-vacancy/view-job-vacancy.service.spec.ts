import { TestBed } from '@angular/core/testing';

import { ViewJobVacancyService } from './view-job-vacancy.service';

describe('ViewJobVacancyService', () => {
  let service: ViewJobVacancyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewJobVacancyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
