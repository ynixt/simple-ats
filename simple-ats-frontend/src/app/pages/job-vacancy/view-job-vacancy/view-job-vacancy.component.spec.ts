import { ActivatedRoute, Router } from '@angular/router';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { of } from 'rxjs';

import { PermissionsSelectors } from 'src/app/store/services/selectors';
import { ViewJobVacancyComponent } from './view-job-vacancy.component';
import { ViewJobVacancyService } from './view-job-vacancy.service';

describe('ViewJobVacancyComponent', () => {
  let component: ViewJobVacancyComponent;
  let spectator: Spectator<ViewJobVacancyComponent>;

  const createComponent = createComponentFactory<ViewJobVacancyComponent>({
    component: ViewJobVacancyComponent,
    providers: [
      mockProvider(ViewJobVacancyService),
      mockProvider(ActivatedRoute, { params: of() }),
      mockProvider(Router),
      mockProvider(PermissionsSelectors, { permissions$: of() }),
    ],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
